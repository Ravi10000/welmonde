import { useId, useState } from "react";
import styles from "./check-box.module.scss";

function CheckBox({ label, register, ...otherProps }) {
  const id = useId();
  const [checked, setChecked] = useState(false);
  return (
    <div className={`${styles.checkbox} ${checked ? styles.active : ""}`}>
      <input
        type="checkbox"
        value={label.toLowerCase()}
        id={id}
        onClick={() => setChecked((prevState) => !prevState)}
        {...register}
        {...otherProps}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default CheckBox;
