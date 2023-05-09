import styles from "./signin.module.scss";
import { useEffect, useRef, useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/button";
import OTPInput from "../../components/otp-input/otp-input";
import { sendOtp } from "../../firebase/auth";
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { setFlash } from "../../redux/flash/flash.actions";
import OtpGroup from "../../components/otp-group/otp-group";

function SigninPage({ setCurrentUser, setFlash }) {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const otpRef = useRef();

  const [validNumber, setValidNumber] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [verifingCaptcha, setVerifingCaptcha] = useState(false);
  const [validate, setValidate] = useState(false);
  const [verifingOtp, setVerifingOtp] = useState(false);

  async function handleSendOtp() {
    setVerifingCaptcha(true);
    console.log({ phone });
    const response = await sendOtp(phone);
    console.log({ response });
    if (response) setOtpSent(true);
    setValidate(response);
    setVerifingCaptcha(false);
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

  useEffect(() => {
    otp.length === 6 && setValidOtp(true);
  }, [otp]);
  return (
    <div className={styles.signinPage}>
      <section className={styles.signinHero}></section>
      <section className={styles.signinSection}>
        <div className={styles.content}>
          <img className={styles.logo} src="/logo-transparent.png" alt="" />
          <h1 className="__subColorHeading">Get Started</h1>
        </div>
        <h2>Sign in / Sign up</h2>
        <div className={styles.inputsContainer}>
          {!otpSent ? (
            <>
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
              <OtpGroup length={6} setOtpString={setOtp} ref={otpRef} />
              <Button
                onClick={verifyOTP}
                disabled={!validOtp}
                isLoading={verifingOtp}
              >
                Verify OTP
              </Button>
              <div className={styles.actions}>
                <p
                  className={styles.action}
                  onClick={otpRef?.current?.resetOtpInputs}
                >
                  resend otp
                </p>
                <p className={styles.action} onClick={() => setOtpSent(false)}>
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

export default connect(null, { setCurrentUser, setFlash })(SigninPage);
