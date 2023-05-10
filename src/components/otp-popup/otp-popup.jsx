import styles from "./otp-popup.module.scss";
import Backdrop from "../backdrop/backdrop";
import OtpGroup from "../otp-group/otp-group";
import { useRef, useState } from "react";
import Button from "../button/button";
import { setFlash } from "../../redux/flash/flash.actions";
import { updateAgreementStatus } from "../../firebase/employee";
import { connect } from "react-redux";
import { useEffect } from "react";

function OtpPopup({ setShowOtpPopup, agreement, onSuccess, setFlash }) {
  console.log("verification OTP: ", agreement?.verificationOtp);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const otpRef = useRef(null);
  const [validOtp, setValidOtp] = useState(false);

  async function verifyOtp() {
    setIsLoading(true);
    try {
      if (!(agreement?.verificationOtp === parseInt(otp))) {
        return setFlash({
          type: "error",
          message: "Invalid OTP",
        });
      }
      await updateAgreementStatus(agreement?.id, "OTP VERIFIED");
      await onSuccess();
      setShowOtpPopup(false);
      setFlash({
        type: "success",
        message: "OTP Verified Successfully",
      });
    } catch (err) {
      console.log(err);
    } finally {
      otpRef?.current?.resetOtpInputs();
      setIsLoading(false);
    }
  }

  useEffect(() => {
    otp.length === 4 ? setValidOtp(true) : setValidOtp(false);
  }, [otp]);
  return (
    <Backdrop>
      <div className={styles.otpPopup}>
        <div className={styles.head}>
          <h2 className={styles.title}>Verify With OTP</h2>
          <img
            className={styles.closeIcon}
            src="/close.png"
            alt=""
            onClick={() => setShowOtpPopup(false)}
          />
        </div>
        <div className={styles.otpContainer}>
          <OtpGroup ref={otpRef} length={4} setOtpString={setOtp} />
          <Button
            disabled={!validOtp}
            isLoading={isLoading}
            onClick={verifyOtp}
          >
            Verify
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}

export default connect(null, { setFlash })(OtpPopup);
