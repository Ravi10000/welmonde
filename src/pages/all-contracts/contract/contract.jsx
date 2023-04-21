import styles from "./contract.module.scss";
import { useState, useRef } from "react";

function Contract({ contract }) {
  const [showMore, setShowMore] = useState(false);
  const docRef = useRef(null);

  return (
    <>
      <tr onClick={() => setShowMore((prevState) => !prevState)}>
        <td>
          <input type="checkbox" />
        </td>
        <td>{contract.title}</td>
        <td className={styles.showMore}>
          <img
            className={showMore ? styles.rotate : ""}
            src="/down.png"
            alt=""
          />
        </td>
      </tr>
      {showMore &&
        contract?.contents?.map((content, i) => (
          <tr className={styles.docs} ref={docRef} key={i}>
            <td>
              <h3>{content?.title}</h3>
            </td>
            <td>{content?.text}</td>
          </tr>
        ))}
    </>
  );
}

export default Contract;
