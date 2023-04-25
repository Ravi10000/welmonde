import styles from "./button.module.scss";
import { useState } from "react";

function Button({
  children,
  fit,
  disabled,
  outlined,
  icon,
  hoverIcon,
  ...otherProps
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{ width: fit ? "fit-content" : "100%" }}
      disabled={disabled}
      className={`${styles.btn} ${disabled && styles.disabled} ${
        outlined && styles.outlined
      }`}
      {...otherProps}
    >
      {icon && <img src={hover ? hoverIcon : icon} alt="" />}
      {children}
    </button>
  );
}

export default Button;
