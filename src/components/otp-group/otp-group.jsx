import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import OTPInput from "../otp-input/otp-input";
import styles from "./otp-group.module.scss";

const OtpGroup = forwardRef((props, ref) => {
  const otpRef = useRef([]);
  const [otp, setOtp] = useState(Array(props?.length).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(false);

  function handleChange(e) {
    let currentIndex = e?.target?.dataset?.index;
    setOtp((prevState) =>
      prevState.map((_, i) => {
        if (i == currentIndex) return e?.target?.value;
        return prevState[i];
      })
    );
    if (!e.target.value) return;
    if (currentIndex >= props?.length - 1) return;
    otpRef.current[parseInt(currentIndex) + 1].focus();
  }

  useImperativeHandle(ref, () => ({
    resetOtpInputs() {
      otpRef?.current?.map((el) => (el.value = ""));
      setOtp(Array(props?.length).fill(""));
      props?.setOtpString("");
    },
    isOtpValid,
  }));

  useEffect(() => {
    if (otpRef) {
      otpRef.current[0].focus();
    }
  }, [otpRef]);

  useEffect(() => {
    props.setOtpString(otp.join(""));
    setIsOtpValid(otp?.join("")?.length == props?.length ? true : false);
  }, [otp]);
  return (
    <div className={styles.otpGroup} ref={ref}>
      {Array(props.length)
        .fill()
        .map((_, i) => (
          <OTPInput
            key={i}
            data-index={i}
            ref={(el) => (otpRef.current[i] = el)}
            onChange={handleChange}
          />
        ))}
    </div>
  );
});

export default OtpGroup;
