import styles from "./input.module.scss";
import { useId } from "react";

function InputBox({ label, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles.inputBox}>
      <label htmlFor={id}>{label}:</label>
      <input id={id} {...otherProps} />
    </div>
  );
}

export default InputBox;
