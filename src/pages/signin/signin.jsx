import styles from "./signin.module.scss";
import { useEffect, useRef, useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/button";
import OTPInput from "../../components/otp-group/otp-input/otp-input";
import {
  createClientProfile,
  fetchClientByPhone,
  fetchUser,
  sendOtp,
  updateClientsUserId,
} from "../../firebase/auth";
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { setFlash } from "../../redux/flash/flash.actions";
import OtpGroup from "../../components/otp-group/otp-group";
import SignInHero from "../../components/sign-in-hero/sign-in-hero";
import TodquestMessage from "../../components/todquest-message/todquest-message";

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
      let user = await fetchUser(userCredientials.user.uid);
      console.log({ user });
      if (!user) {
        // const existingClients = await fetchClientByPhone(phone);
        // console.log({ existingClients });
        // if (existingClients.length > 0) {
        // if (!existingClients[0].userId)
        // await updateClientsUserId(
        // existingClients[0].id,
        // userCredientials.user.uid
        // );
        // }
        user = await createClientProfile(userCredientials.user.uid, {
          mobile: userCredientials.user.phoneNumber,
          usertype: "CLIENT",
        });
        const clients = await fetchClientByPhone(
          userCredientials.user.phoneNumber
        );
        console.log({ clients });
        // await updateClientsUserId(clients[0].id, userCredientials.user.uid);
      }
      // setCurrentUser(userCredientials?.user);
      setCurrentUser({
        phone: userCredientials.user.phoneNumber,
        uid: userCredientials.user.uid,
      });
      setFlash({
        type: "success",
        message: "Successfully Signed In",
      });
      setVerifingOtp(false);
      navigate("/dashboard");
      console.log(userCredientials);
    }
  }

  useEffect(() => {
    otp.length === 6 && setValidOtp(true);
  }, [otp]);

  return (
    <div className={styles.signinPage}>
      {/* <section className={styles.signinHero}>
        <div className={styles.content}>
          <h1 className={styles.tagLine}>
            Nation's Largest Health Care Platform
          </h1>
        </div>
      </section> */}
      <SignInHero />
      <TodquestMessage />

      <section className={styles.signinSection}>
        <div className={styles.headings}>
          <h1 className="__subColorHeading">Get Started</h1>
          <h2>Sign in / Sign up</h2>
        </div>
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
