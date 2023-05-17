import styles from "./contract.module.scss";
import Button from "../../../components/button/button";
import { useState, useRef } from "react";
import Backdrop from "../../../components/backdrop/backdrop";

function Contract({ contract }) {
  const [showMore, setShowMore] = useState(false);
  const docRef = useRef(null);

  return (
    <>
      <tr onClick={() => setShowMore((prevState) => !prevState)}>
        <td>
          <input type="checkbox" />
        </td>
        <td>{contract.name}</td>
        <td>{contract.employee}</td>
        <td>{contract.status}</td>
        <td>{contract.client}</td>
        <td className={styles.showMore}>
          <img
            className={showMore ? styles.rotate : ""}
            src="/down.png"
            alt=""
          />
        </td>
      </tr>
      {/* {showMore &&
        contract?.contents?.map((content, i) => (
          <tr className={styles.docs} ref={docRef} key={i}>
            <td></td>
            <td>
              <h3>{content?.title}</h3>
            </td>
            <td>
              <Button fit>
                <p>Download pdf</p>
                <img src="/download-with-base.png" alt="" />
              </Button>
            </td>
          </tr>
        ))} */}
    </>
  );
}

export default Contract;
