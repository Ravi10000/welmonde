import { useEffect, useId, useRef, useState } from "react";
import styles from "./check-box.module.scss";

function CheckBox({ label, register, defaultChecked, ...otherProps }) {
  // console.log({ defaultChecked, label });
  const id = useId();
  const [checked, setChecked] = useState(defaultChecked);
  // console.log({ checked });
  return (
    <div className={`${styles.checkbox} ${checked ? styles.active : ""}`}>
      <label className={styles.overlay} htmlFor={id}></label>
      <div className={`${styles.check} ${checked ? styles.active : ""}`}></div>
      <input
        type="checkbox"
        value={label.toLowerCase()}
        id={id}
        onClick={(e) => {
          e.stopPropagation();
          setChecked((prevState) => !prevState);
        }}
        defaultChecked={defaultChecked}
        {...register}
        {...otherProps}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default CheckBox;
