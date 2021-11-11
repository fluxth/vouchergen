import { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { Button, Form, Alert } from "react-bootstrap";
import parse from "csv-parse/lib/sync";

import type { VoucherData } from "./Voucher";

export type VoucherFormData = {
  vouchers: VoucherData[];
};

type CSVRow = {
  Login: string;
  Password: string;
  [key: string]: string;
};

type Props = {
  onSubmit?: (data: VoucherFormData) => void;
};

type State = {
  csvData: CSVRow[] | null;
  csvError: string | null;
};

class VoucherForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      csvData: null,
      csvError: null,
    };
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
      };

      reader.readAsText(file);
    });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { props, state } = this;

    if (!state.csvData) return;

    const form = event.target as HTMLFormElement;
    const header = form.header.value;

    if (typeof window !== "undefined") {
      localStorage.setItem("VoucherForm_Header", header);
    }

    if (props.onSubmit)
      props.onSubmit({
        vouchers: state.csvData.map((row: CSVRow) => {
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

  render() {
    let headerDefault = null;
    if (typeof window !== "undefined") {
      headerDefault = localStorage.getItem("VoucherForm_Header");
    }

    return (
      <>
        <Form onSubmit={this.handleFormSubmit}>
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

          <p className="text-muted mb-3">
            <b>Note:</b> One printed A4 page can hold up to 21 vouchers
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
          </div>
        </Form>
      </>
    );
  }
}

export default VoucherForm;
