import { Container, Row, Button } from "react-bootstrap";

import {
  faChevronLeft,
  faPrint,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/VoucherPage.module.scss";
import Voucher from "./Voucher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { VoucherData } from "./Voucher";

const ITEMS_PER_ROW = 3;
const ROWS_PER_PAGE = 7;

type Props = {
  vouchers: VoucherData[];
  onBackClick?: () => void;
};

const VoucherPage = (props: Props) => {
  const rows = [...Array(Math.ceil(props.vouchers.length / ITEMS_PER_ROW))];
  const voucherRows = rows.map((_, i) =>
    props.vouchers.slice(i * ITEMS_PER_ROW, i * ITEMS_PER_ROW + ITEMS_PER_ROW)
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
              <Voucher
                data={item}
                icon={faWifi}
                key={`${row_index}_${item_index}`}
              />
            ))}
          </Row>
          {(row_index + 1) % ROWS_PER_PAGE === 0 ? (
            <div className={styles.pagebreak}></div>
          ) : null}
        </div>
      ))}
    </Container>
  );
};

export default VoucherPage;
