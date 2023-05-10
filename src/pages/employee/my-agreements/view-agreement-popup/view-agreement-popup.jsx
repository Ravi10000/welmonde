import styles from "./view-agreement-popup.module.scss";

import Backdrop from "../../../../components/backdrop/backdrop";
import { useState } from "react";
import ScrollToTop from "../../../../components/scrollToTop";
import PdfViewer from "../../../../components/pdf-viewer/pdf-viewer";

function ViewAgreementPopup({ agreement, closeAgreement }) {
  const [contract, setContract] = useState(false);
  console.log({ pdf: contract });
  return (
    <>
      {contract && (
        <PdfViewer
          contract={contract}
          closePdf={() => {
            setContract(null);
            console.log("close pdf");
          }}
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
              <div className={styles.contract} key={contract}>
                <p key={contract}>{contract}</p>
                <div
                  className={styles.viewPdf}
                  onClick={() =>
                    setContract({ agreement, contractName: contract })
                  }
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
