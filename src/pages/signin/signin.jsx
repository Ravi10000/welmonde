import styles from "./signin.module.scss";
import { useEffect, useRef, useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/button";
import InputBox from "../../components/input/input";
import OTPInput from "../../components/otp-input/otp-input";
import { sendOtp } from "../../firebase/auth";
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { setFlash } from "../../redux/flash/flash.actions";

function SigninPage({ setCurrentUser, setFlash }) {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [verifingCaptcha, setVerifingCaptcha] = useState(false);
  const [validate, setValidate] = useState(false);
  const [verifingOtp, setVerifingOtp] = useState(false);

  const digit1 = useRef();
  const digit2 = useRef();
  const digit3 = useRef();
  const digit4 = useRef();
  const digit5 = useRef();
  const digit6 = useRef();

  async function handleSendOtp() {
    setVerifingCaptcha(true);
    console.log({ phone });
    const response = await sendOtp(phone);
    console.log({ response });
    if (response) setOtpSent(true);
    setValidate(response);
    setVerifingCaptcha(false);
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
      if (e.target.name === "digit4") {
        digit5.current.focus();
      }
      if (e.target.name === "digit5") {
        digit6.current.focus();
      }
    }
    if (
      digit1.current.value.length === 1 &&
      digit2.current.value.length === 1 &&
      digit3.current.value.length === 1 &&
      digit4.current.value.length === 1 &&
      digit5.current.value.length === 1 &&
      digit6.current.value.length === 1
    ) {
      setOtp(
        digit1.current.value +
          digit2.current.value +
          digit3.current.value +
          digit4.current.value +
          digit5.current.value +
          digit6.current.value
      );
      setValidOtp(true);
    } else {
      setValidOtp(false);
    }
  }
  function handlePhoneChange(e) {
    console.log(e);
    // console.log(e.target.value.length);
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
    digit5.current.value = "";
    digit6.current.value = "";
    digit1.current.focus();
  }
  async function verifyOTP() {
    setVerifingOtp(true);
    console.log({ otp });
    const userCredientials = await validate.confirm(otp);
    console.log(userCredientials);
    if (userCredientials?.user) {
      setCurrentUser({ phone: userCredientials.user.phoneNumber });
      setFlash({
        type: "success",
        message: "Successfully Signed In",
      });
      setVerifingOtp(false);
      navigate("/");
      console.log(userCredientials);
    }
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
            <>
              {/* <InputBox
                label="phone"
                placeholder="Enter Phone Number"
                inputMode="numeric"
                onChange={handlePhoneChange}
                disabled={otpSent}
                maxLength={10}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
              /> */}
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="IN"
                value={phone}
                onChange={setPhone}
              />
              <div id="recaptcha-container"></div>
              {/* {!verifingCaptcha && ( */}
              <Button
                onClick={handleSendOtp}
                // disabled={!validNumber}
                id="sign-in-button"
              >
                Send OTP
              </Button>
              {/* )} */}
            </>
          ) : (
            <p>OTP sent to {phone}</p>
          )}

          {otpSent && (
            <>
              <div className={styles.otpContainer}>
                <OTPInput
                  ref={digit1}
                  name="digit1"
                  onChange={handleOtpChange}
                />
                <OTPInput
                  ref={digit2}
                  name="digit2"
                  onChange={handleOtpChange}
                />
                <OTPInput
                  ref={digit3}
                  name="digit3"
                  onChange={handleOtpChange}
                />
                <OTPInput
                  ref={digit4}
                  name="digit4"
                  onChange={handleOtpChange}
                />
                <OTPInput
                  ref={digit5}
                  name="digit5"
                  onChange={handleOtpChange}
                />
                <OTPInput
                  ref={digit6}
                  name="digit6"
                  onChange={handleOtpChange}
                />
              </div>
              <Button
                onClick={verifyOTP}
                disabled={!validOtp}
                isLoading={verifingOtp}
              >
                Verify OTP
              </Button>
              <div className={styles.actions}>
                <p className={styles.action} onClick={resetOtpInputs}>
                  resend otp
                </p>
                <p className={styles.action} onClick={() => setOtpSent(false)}>
                  edit phone number
                </p>
              </div>
            </>
          )}
          {/* {!otpSent ? (
            <Button
              onClick={handleSendOtp}
              disabled={!validNumber}
              id="sign-in-button"
            >
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
          )} */}
        </div>
      </section>
    </div>
  );
}

export default connect(null, { setCurrentUser, setFlash })(SigninPage);
