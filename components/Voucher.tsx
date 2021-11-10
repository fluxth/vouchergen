import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import styles from "../styles/Voucher.module.scss";
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

const Voucher = (props: Props) => {
  let subheader = "Internet Voucher";
  let typeIcon = null;
  switch (props.data.type) {
    case "restaurant":
      subheader = "Restaurant " + subheader;
      typeIcon = faUtensils;
      break;
    case "hotel":
      subheader = "Hotel " + subheader;
      typeIcon = faBed;
      break;
  }

  let footer = "";
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
      footer = `Valid for ${expiry}`;
    } else {
      const numExpiry = parseInt(expiry);
      footer = `Valid for ${numExpiry} ${suffix}`;
      if (numExpiry !== 1) footer += "s";
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
        <p>{subheader}</p>
      </div>
      <Row>
        <Col xs={6} className={styles.infoHead}>
          Username:
        </Col>
        <Col xs={6}>
          <samp>{props.data.username}</samp>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className={styles.infoHead}>
          Password:
        </Col>
        <Col xs={6}>
          <samp>{props.data.password}</samp>
        </Col>
      </Row>
      <p className={styles.footer}>
        {typeIcon ? <FontAwesomeIcon fixedWidth icon={typeIcon} /> : null}{" "}
        {footer}
      </p>
    </Col>
  );
};

export default Voucher;
