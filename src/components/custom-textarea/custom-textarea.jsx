import styles from "./custom-textarea.module.scss";
import React, { useId } from "react";

export default function CustomTextarea({ label, placeholder, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles["long-text-input"]}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {/* <p className={styles["textarea-msg"]}>{placeholder}</p> */}
      <textarea
        required
        id={id}
        className={styles["text-input"]}
        {...otherProps}
      ></textarea>
    </div>
  );
}
