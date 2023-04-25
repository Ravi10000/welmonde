import styles from "./signin.module.scss";
import { useEffect, useRef, useState } from "react";

// components
import Button from "../../components/button/button";
import InputBox from "../../components/input/input";
import OTPInput from "../../components/otp-input/otp-input";

function SigninPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");

  const digit1 = useRef();
  const digit2 = useRef();
  const digit3 = useRef();
  const digit4 = useRef();

  function handleSendOtp() {
    setOtpSent(true);
  }
  useEffect(() => {
    if (otpSent) {
      digit1.current.focus();
    }
  }, [otpSent]);

  function handleOtpChange(e) {
    if (e.target.value.length === 1) {
      if (e.target.name === "digit1") {
        digit2.current.focus();
      }
      if (e.target.name === "digit2") {
        digit3.current.focus();
      }
      if (e.target.name === "digit3") {
        digit4.current.focus();
      }
    }
    if (
      digit1.current.value.length === 1 &&
      digit2.current.value.length === 1 &&
      digit3.current.value.length === 1 &&
      digit4.current.value.length === 1
    ) {
      setOtp(
        digit1.current.value +
          digit2.current.value +
          digit3.current.value +
          digit4.current.value
      );
      setValidOtp(true);
    } else {
      setValidOtp(false);
    }
  }
  function handlePhoneChange(e) {
    if (!(e.target.value.length === 10)) return setValidNumber(false);
    setValidNumber(true);
    setPhone(e.target.value);
  }
  function resetOtpInputs() {
    setValidOtp(false);
    setOtp("");
    digit1.current.value = "";
    digit2.current.value = "";
    digit3.current.value = "";
    digit4.current.value = "";
    digit1.current.focus();
  }
  return (
    <div className={styles.signinPage}>
      <section className={styles.signinHero}>
        {/* <div className={styles.content}>
          <img className={styles.logo} src="/logo-transparent.png" alt="" />
          <h1 className="__subColorHeading">Get Started</h1>
        </div> */}
      </section>
      <section className={styles.signinSection}>
        <div className={styles.content}>
          <img className={styles.logo} src="/logo-transparent.png" alt="" />
          <h1 className="__subColorHeading">Get Started</h1>
        </div>
        <h2>Sign in / Sign up</h2>
        <div className={styles.inputsContainer}>
          {!otpSent ? (
            <InputBox
              label="phone"
              placeholder="Enter Phone Number"
              inputMode="numeric"
              onChange={handlePhoneChange}
              disabled={otpSent}
              maxLength={10}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          ) : (
            <p>OTP sent to {phone}</p>
          )}
          {otpSent && (
            <div className={styles.otpContainer}>
              <OTPInput ref={digit1} name="digit1" onChange={handleOtpChange} />
              <OTPInput ref={digit2} name="digit2" onChange={handleOtpChange} />
              <OTPInput ref={digit3} name="digit3" onChange={handleOtpChange} />
              <OTPInput ref={digit4} name="digit4" onChange={handleOtpChange} />
            </div>
          )}
          {!otpSent ? (
            <Button onClick={handleSendOtp} disabled={!validNumber}>
              Send OTP
            </Button>
          ) : (
            <>
              <Button onClick={() => setOtpSent(true)} disabled={!validOtp}>
                Verify OTP
              </Button>
              <div className={styles.actions}>
                <p className={styles.changeNumber} onClick={resetOtpInputs}>
                  resend otp
                </p>
                <p
                  className={styles.changeNumber}
                  onClick={() => setOtpSent(false)}
                >
                  edit phone number
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default SigninPage;
