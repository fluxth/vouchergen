import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import styles from "../styles/VoucherCompact.module.scss";
import { faUtensils, faBed } from "@fortawesome/free-solid-svg-icons";

export type VoucherData = {
  header: string;
  username: string;
  password: string;
  expiry?: string;
  type?: "hotel" | "restaurant";
};

type Props = {
  icon?: IconDefinition;
  data: VoucherData;
};

const VoucherCompact = (props: Props) => {
  let subheader = "";
  let typeIcon = null;
  switch (props.data.type) {
    case "restaurant":
      subheader = "Restaurant: ";
      typeIcon = faUtensils;
      break;
    case "hotel":
      subheader = "Hotel: ";
      typeIcon = faBed;
      break;
  }

  let validLabel = "";
  if (props.data.expiry) {
    let expiry = props.data.expiry;
    let suffix: string | null = expiry.substr(expiry.length - 1);

    switch (suffix) {
      case "m":
        suffix = "minute";
        break;
      case "h":
        suffix = "hour";
        break;
      case "d":
        suffix = "day";
        break;
      case "w":
        suffix = "week";
        break;
      case "y":
        suffix = "year";
        break;
      default:
        suffix = null;
        break;
    }

    if (!suffix) {
      validLabel = `Valid ${expiry}`;
    } else {
      const numExpiry = parseInt(expiry);
      validLabel = `Valid ${numExpiry} ${suffix}`;
      if (numExpiry !== 1) validLabel += "s";
    }
  }

  return (
    <Col className={styles.item}>
      <div className={styles.header}>
        <h2>
          {props.icon ? (
            <>
              <FontAwesomeIcon icon={props.icon} />{" "}
            </>
          ) : null}
          {props.data.header}
        </h2>
      </div>
      <Row className={styles.infoRow}>
        <Col xs={6} className={styles.infoHead}>
          Username:
        </Col>
        <Col xs={6} className={styles.infoCred}>
          <samp>{props.data.username}</samp>
        </Col>
      </Row>
      <Row className={styles.infoRow}>
        <Col xs={6} className={styles.infoHead}>
          Password:
        </Col>
        <Col xs={6} className={styles.infoCred}>
          <samp>{props.data.password}</samp>
        </Col>
      </Row>
      <p>
        {typeIcon ? (
          /* FIXME: Type this properly */
          <FontAwesomeIcon fixedWidth icon={typeIcon as any} />
        ) : null}{" "}
        {subheader + validLabel}
      </p>
    </Col>
  );
};

export default VoucherCompact;
