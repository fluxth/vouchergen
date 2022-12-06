import { Container, Row, Button } from "react-bootstrap";

import {
  faChevronLeft,
  faPrint,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/VoucherPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { VoucherData } from "./VoucherForm";
import { VoucherPageLayout } from "./VoucherForm";

type Props = {
  vouchers: VoucherData[];
  layout: VoucherPageLayout;
  onBackClick?: () => void;
};

const VoucherPage = (props: Props) => {
  const { rows, cols } = props.layout;
  const VoucherComponent = props.layout.component;

  const voucherRows = [...Array(Math.ceil(props.vouchers.length / cols))].map(
    (_, i) => props.vouchers.slice(i * cols, i * cols + cols)
  );

  return (
    <Container fluid className={styles.container}>
      <div className={styles.helper + " text-center mt-4"}>
        <Button
          variant="secondary"
          onClick={() => {
            if (props.onBackClick) props.onBackClick();
          }}
        >
          <FontAwesomeIcon fixedWidth icon={faChevronLeft} /> Go Back
        </Button>{" "}
        <Button onClick={() => window.print()}>
          <FontAwesomeIcon fixedWidth icon={faPrint} /> Print
        </Button>
      </div>
      {voucherRows.map((row, row_index) => (
        <div key={row_index}>
          <Row>
            {row.map((item, item_index) => (
              <VoucherComponent
                data={item}
                icon={faWifi}
                key={`${row_index}_${item_index}`}
              />
            ))}
          </Row>
          {(row_index + 1) % rows === 0 ? (
            <div className={styles.pagebreak}></div>
          ) : null}
        </div>
      ))}
    </Container>
  );
};

export default VoucherPage;
