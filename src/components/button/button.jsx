import styles from "./button.module.scss";
import { useState } from "react";

function Button({
  children,
  fit,
  isLoading,
  outlined,
  icon,
  danger,
  destruct,
  action,
  iconOnly,
  hoverIcon,
  ...otherProps
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      // style={{ width: fit ? "fit-content" : "100%" }}
      disabled={isLoading}
      className={`
      ${styles.btn} 
      ${fit ? styles.fit : ""} 
      ${outlined ? styles.outlined : ""} 
      ${iconOnly ? styles.iconOnly : ""} 
      ${action ? styles.action : ""} 
      ${destruct ? styles.destruct : ""} 
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
