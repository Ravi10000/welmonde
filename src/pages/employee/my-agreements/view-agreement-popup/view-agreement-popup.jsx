import styles from "./view-agreement-popup.module.scss";

import Backdrop from "../../../../components/backdrop/backdrop";
import { useState } from "react";
import ScrollToTop from "../../../../components/scrollToTop";
import PdfViewer from "../../../../components/pdf-viewer/pdf-viewer";

function ViewAgreementPopup({ agreement, closeAgreement }) {
  console.log(agreement);
  const [pdf, setPdf] = useState(false);

  return (
    <>
      {pdf && (
        <PdfViewer
          pdfLink="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
          closePdf={() => setPdf(null)}
        />
      )}
      <Backdrop>
        <section className={styles.viewAgreement}>
          <div className={styles.head}>
            <h1 className={styles.title}>View Agreement</h1>
            <div className={styles.closeIcon} onClick={closeAgreement}>
              <img src="/close.png" alt="" />
            </div>
          </div>
          <div className={styles.agreementList}>
            {agreement?.contracts?.map((contract) => (
              <div className={styles.contract}>
                <p key={contract}>{contract}</p>
                <div
                  className={styles.viewPdf}
                  onClick={() => setPdf(contract)}
                >
                  <img src="/pdf.png" alt="" />
                  <p>view</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Backdrop>
    </>
  );
}

export default ViewAgreementPopup;
