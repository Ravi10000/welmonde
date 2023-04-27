import styles from "./button.module.scss";
import { useState } from "react";

function Button({
  children,
  fit,
  isLoading,
  outlined,
  icon,
  danger,
  hoverIcon,
  ...otherProps
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{ width: fit ? "fit-content" : "100%" }}
      disabled={isLoading}
      className={`
      ${styles.btn} 
      ${outlined ? styles.outlined : ""} 
      ${danger ? styles.danger : ""} 
      ${isLoading && styles.isLoading} 
      `}
      {...otherProps}
    >
      {icon && <img src={hover ? hoverIcon : icon} alt="" />}
      {children}
      {isLoading && <div className={styles.loader}></div>}
    </button>
  );
}

export default Button;
