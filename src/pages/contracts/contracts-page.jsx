import styles from "./contracts-page.module.scss";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMyAgreements } from "../../firebase/agreement";
import PdfViewer from "../../components/pdf-viewer/pdf-viewer";
import Button from "../../components/button/button";
import OtpGroup from "../../components/otp-group/otp-group";
import { updateAgreementStatus } from "../../firebase/employee";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
function ContractsPage({ setFlash }) {
  const { agreementId } = useParams();
  const [agreement, setAgreement] = useState({});
  const [pdf, setPdf] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpString, setOtpString] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRef = useRef();

  async function handleFetchAgreement() {
    try {
      const data = await fetchMyAgreements(agreementId);
      setAgreement(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleOtpVerification() {
    setIsVerifying(true);
    try {
      if (parseInt(otpString) !== agreement?.verificationOtp) {
        return setFlash({
          type: "error",
          message: "Invalid OTP",
        });
      }
      await updateAgreementStatus(agreementId, "OTP VERIFIED");
      await handleFetchAgreement();
      setFlash({
        type: "success",
        message: "Agreement Verified",
      });
    } catch (err) {
      console.log(err);
    } finally {
      otpRef.current.resetOtpInputs();
      setIsVerifying(false);
    }
  }

  async function handleDeny() {
    setIsRejecting(true);
    try {
      const res = await updateAgreementStatus(agreementId, "DENIED");
      if (res?.error) {
        return setFlash({
          type: "error",
          message: res.error,
        });
      }
      await handleFetchAgreement();
      setFlash({
        type: "success",
        message: "Agreement Rejected",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsRejecting(false);
    }
  }

  useEffect(() => {
    handleFetchAgreement();
  }, []);

  useEffect(() => {
    setIsOtpValid(otpString?.length == 4 ? true : false);
  }, [otpString]);

  return (
    <div className={styles.contractsPage}>
      <div className={styles.pageContent}>
        <h1>My Contracts</h1>
        {pdf && (
          <PdfViewer
            pdfLink="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
            closePdf={() => setPdf(null)}
          />
        )}
        <div className={styles.agreementContainer}>
          {agreement?.contracts?.map((contract) => (
            <div className={styles.contract} key={contract}>
              <h3 className={styles.contractName}>{contract}</h3>
              <div className={styles.showPdf} onClick={() => setPdf(contract)}>
                <img src="/pdf.png" alt="" />
                <p>show pdf</p>
              </div>
            </div>
          ))}
        </div>
        {(agreement?.status === "SENT TO CLIENT" ||
          agreement?.status === "ADDED") && (
          <div className={styles.userActions}>
            <div
              className={`${styles.check} ${
                showOtpInput ? styles.dontChange : ""
              }`}
            >
              <input
                type="checkbox"
                id="iagree"
                onChange={() => setAgree((prevState) => !prevState)}
              />
              <label htmlFor="iagree">I Agree to all contracts</label>
            </div>
            <div className={styles.buttons}>
              {showOtpInput ? (
                <div className={styles.otpSection}>
                  <OtpGroup
                    ref={otpRef}
                    length={4}
                    setOtpString={setOtpString}
                  />
                  <Button
                    disabled={!isOtpValid}
                    isLoading={isVerifying}
                    onClick={handleOtpVerification}
                  >
                    Verify
                  </Button>
                </div>
              ) : (
                <Button disabled={!agree} onClick={() => setShowOtpInput(true)}>
                  Send OTP to verify
                </Button>
              )}
              <Button destruct onClick={handleDeny} isLoading={isRejecting}>
                Reject
              </Button>
            </div>
          </div>
        )}
        {agreement?.status === "DENIED" && (
          <h3 className={styles.rejectedMessage}>
            This Agreement Was Rejected!
          </h3>
        )}
        {agreement?.status === "OTP VERIFIED" && (
          <h3 className={styles.verified}>
            This Agreement Was Verified Successfully!
          </h3>
        )}
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(ContractsPage);
