import { useEffect, useState } from "react";
import styles from "./contracts-page.module.scss";
import { useParams } from "react-router-dom";
import { fetchMyAgreements } from "../../firebase/agreement";

function ContractsPage() {
  const { agreementId } = useParams();
  const [agreement, setAgreement] = useState({});
  const [showPdf, setShowPdf] = useState(false);

  async function handleFetchAgreement() {
    try {
      const data = await fetchMyAgreements(agreementId);
      console.log(data);
      setAgreement(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFetchAgreement();
  }, []);
  console.log({ agreementId });
  return (
    <div className={styles.contractsPage}>
      <div className={styles.pageContent}>
        <h1>My Contracts</h1>
        {showPdf && (
          <div className={styles.pdfViewer}>
            <iframe src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"></iframe>
            <button
              className={styles.closeBtn}
              onClick={() => {
                setShowPdf(false);
              }}
            >
              close pdf
            </button>
          </div>
        )}
        <div className={styles.agreementContainer}>
          {agreement?.contracts?.map((contract) => (
            <div className={styles.contract}>
              <h3>{contract}</h3>
              <p className={styles.link} onClick={() => setShowPdf(true)}>
                show pdf
              </p>
            </div>
          ))}
        </div>
        <div className={styles.approve}>
          <div className={styles.check}>
            <input type="checkbox" id="iagree" />
            <label htmlFor="iagree">I Agree to all contracts</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractsPage;
