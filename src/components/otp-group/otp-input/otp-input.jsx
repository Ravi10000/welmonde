import styles from "./otp-input.module.scss";
import { forwardRef } from "react";

const OTPInput = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={styles.otpInput}
      maxLength={1}
      inputMode="numeric"
      onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
      {...props}
    />
  );
});

export default OTPInput;
