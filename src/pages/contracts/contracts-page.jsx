import { useEffect, useRef, useState } from "react";
import styles from "./contracts-page.module.scss";
import { useParams } from "react-router-dom";
import { fetchMyAgreements } from "../../firebase/agreement";
import PdfViewer from "../../components/pdf-viewer/pdf-viewer";
import Button from "../../components/button/button";
import OtpGroup from "../../components/otp-group/otp-group";

function ContractsPage() {
  const { agreementId } = useParams();
  const [agreement, setAgreement] = useState({});
  const [pdf, setPdf] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpString, setOtpString] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);

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
    otpRef.current.resetOtpInputs();
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
              <p className={styles.link} onClick={() => setPdf(contract)}>
                show pdf
              </p>
            </div>
          ))}
        </div>
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
                <OtpGroup ref={otpRef} length={4} setOtpString={setOtpString} />
                <Button disabled={!isOtpValid} onClick={handleOtpVerification}>
                  Verify
                </Button>
              </div>
            ) : (
              <Button disabled={!agree} onClick={() => setShowOtpInput(true)}>
                Send OTP to verify
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractsPage;
