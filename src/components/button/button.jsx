import styles from "./button.module.scss";

function Button({ children, fit, disabled, ...otherProps }) {
  return (
    <button
      style={{ width: fit ? "fit-content" : "100%" }}
      disabled={disabled}
      className={`${styles.btn} ${disabled && styles.disabled}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
