import styles from "./num-input.module.scss";

import React, { useId } from "react";

export default function NumInput({ label, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles["num-input-container"]}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        required
        id={id}
        className={styles["num-input"]}
        inputMode="numeric"
        onInput={(e) =>
          (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
        }
        {...otherProps}
      />
    </div>
  );
}
