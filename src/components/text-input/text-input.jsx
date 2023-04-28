import styles from "./text-input.module.scss";

import React, { useId, useState } from "react";

export default function TextInput({ label, register, error, ...otherProps }) {
  const id = useId();
  const [show, setShow] = useState(false);
  function handleTooglePassword() {
    setShow((show) => !show);
  }
  return (
    <div className={styles["input-container"]}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.passwordInput}>
        <input
          id={id}
          className={`${styles["text-input"]} ${
            otherProps?.type === "password" && styles.password
          }`}
          {...register}
          {...otherProps}
          type={
            otherProps?.type === "password"
              ? show
                ? "text"
                : "password"
              : otherProps?.type
          }
        />
        {otherProps?.type === "password" && (
          <img
            onClick={handleTooglePassword}
            className={styles.toggleShow}
            src={`/eye-${show ? "opened" : "closed"}.png`}
            alt=""
          />
        )}
      </div>
      <label htmlFor={id} className={styles.errMsg}>
        {error}
      </label>
    </div>
  );
}
