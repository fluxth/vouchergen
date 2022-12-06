import { Component, createRef } from "react";
import type { RefObject } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { Button, Form } from "react-bootstrap";
import parse from "csv-parse/lib/sync";

import Voucher from "./Voucher";
import VoucherCompact from "./VoucherCompact";

export type VoucherData = {
  header: string;
  username: string;
  password: string;
  expiry?: string;
  type?: "hotel" | "restaurant";
};

export type VoucherProps = {
  icon?: IconDefinition;
  data: VoucherData;
};

export type VoucherPageLayout = {
  name: string;
  rows: number;
  cols: number;
  capacity: number;
  component: React.FC<VoucherProps>;
};

export type VoucherFormData = {
  vouchers: VoucherData[];
  layout: VoucherPageLayout;
};

type CSVRow = {
  Login: string;
  Password: string;
  [key: string]: string;
};

type Props = {
  onSubmit?: (data: VoucherFormData) => void;
  onDataLoad?: (data: VoucherFormData) => void;
};

type State = {
  csvData: CSVRow[] | null;
  csvError: string | null;
  layout: VoucherPageLayout;
};

const getLayout = (layoutName: string): VoucherPageLayout | null => {
  switch (layoutName) {
    case "default":
    case "4x12":
      return {
        name: "4x12",
        rows: 12,
        cols: 4,
        capacity: 4 * 12,
        component: VoucherCompact,
      };
    case "3x7":
      return {
        name: "3x7",
        rows: 7,
        cols: 3,
        capacity: 3 * 7,
        component: Voucher,
      };
    default:
      return null;
  }
};

class VoucherForm extends Component<Props, State> {
  form: RefObject<HTMLFormElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      csvData: null,
      csvError: null,
      layout: getLayout("default")!,
    };
    this.form = createRef<HTMLFormElement>();
  }

  handleCsvSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ csvData: null, csvError: null }, () => {
      const files = event?.target?.files;

      if (!files || files.length !== 1) {
        this.setState({ csvError: "Please select a voucher CSV file" });
        return;
      }

      const file = files[0];

      if (file.type !== "text/csv") {
        this.setState({ csvError: "Only CSV files are allowed" });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e?.target?.result;
        if (!result || typeof result !== "string") {
          this.setState({ csvError: "Could not read CSV file" });
          return;
        }

        let data;
        try {
          data = parse(result.trim(), {
            columns: true,
            skip_empty_lines: true,
          });
        } catch {
          this.setState({ csvError: "Invalid CSV format" });
          return;
        }

        if (!data) {
          this.setState({ csvError: "CSV parse error" });
          return;
        }

        if (data.length <= 0) {
          this.setState({ csvError: "CSV has no voucher data" });
          return;
        }

        for (const row of data) {
          if (!("Login" in row) || !("Password" in row)) {
            this.setState({ csvError: "Invalid voucher data" });
            return;
          }
        }

        this.setState({ csvData: data });
        if (this.props.onDataLoad) this.props.onDataLoad(data);
      };

      reader.readAsText(file);
    });
  };

  handleFormSubmit = (
    form: HTMLFormElement,
    csvOverride: CSVRow[] | null = null
  ) => {
    const { props, state } = this;

    const csv = csvOverride || state.csvData;
    if (!csv) return;

    const header = form.header.value;

    if (typeof window !== "undefined") {
      localStorage.setItem("VoucherForm_Header", header);
    }

    if (props.onSubmit)
      props.onSubmit({
        layout: this.state.layout,
        vouchers: csv.map((row: CSVRow) => {
          let type = form.voucher_type.value;
          if (type === "auto") {
            const firstChar = row.Login.substr(0, 1);
            switch (firstChar) {
              case "h":
                type = "hotel";
                break;
              case "r":
                type = "restaurant";
                break;
              default:
                type = undefined;
                break;
            }
          }

          return {
            header: header,
            username: row.Login,
            password: row.Password,
            type: type,
            expiry: row["Uptime Limit"],
          };
        }),
      });
  };

  handlePreview = () => {
    const form = this.form.current;
    if (!form) return;

    const csv: CSVRow[] = [];

    for (let i = 0; i < this.state.layout.capacity * 2; ++i) {
      csv.push({
        Login: `user${i + 1}`,
        Password: "PREVIEW",
        "Uptime Limit": "69d",
      });
    }

    this.handleFormSubmit(form, csv);
  };

  render() {
    let headerDefault = null;
    if (typeof window !== "undefined") {
      headerDefault = localStorage.getItem("VoucherForm_Header");
    }

    return (
      <>
        <Form
          ref={this.form}
          onSubmit={(event) => {
            event.preventDefault();
            this.handleFormSubmit(event.target as HTMLFormElement);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Site Name</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="header"
              required
              placeholder="SpeedyWiFi"
              defaultValue={headerDefault ? headerDefault : undefined}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              <b>Voucher CSV</b>
            </Form.Label>
            <Form.Control
              type="file"
              name="payload"
              onChange={this.handleCsvSelect}
            />
            {this.state.csvError ? (
              <Form.Text className="text-danger">
                {this.state.csvError}
              </Form.Text>
            ) : null}
            {this.state.csvData ? (
              <Form.Text className="text-success">
                <b>{this.state.csvData.length}</b> vouchers loaded successfully
              </Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Voucher Type</b>
            </Form.Label>
            <Form.Select name="voucher_type">
              <option value="auto">Auto-Detect</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Voucher Layout</b>
            </Form.Label>
            <Form.Select
              name="voucher_layout"
              value={this.state.layout.name}
              onChange={(event) => {
                const { value } = event.target;
                this.setState((state) => ({
                  ...state,
                  layout: getLayout(value) || getLayout("default")!,
                }));
              }}
            >
              <option value="4x12">4 x 12 (Compact)</option>
              <option value="3x7">3 x 7 (Sparse)</option>
            </Form.Select>
          </Form.Group>

          <p className="text-muted mb-3">
            <b>Note:</b> One printed A4 page can hold up to{" "}
            {this.state.layout.capacity} vouchers
          </p>

          <div className="d-grid gap-2">
            <Button
              variant="success"
              size="lg"
              type="submit"
              disabled={!this.state.csvData}
            >
              <FontAwesomeIcon fixedWidth icon={faCheck} /> Generate
            </Button>
            <div className="text-end">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.handlePreview();
                }}
              >
                Preview Layout
              </a>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default VoucherForm;
