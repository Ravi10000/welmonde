import styles from "./pdf-viewer.module.scss";
import ScrollToTop from "../scrollToTop";
import ContractPdf from "../contract-pdf/contract-pdf";

function PdfViewer({ contract, closePdf, ...props }) {
  return (
    <div className={styles.pdfViewer}>
      <ScrollToTop />
      <div className={styles.pdfContainer}>
        <ContractPdf contract={contract} />
        <button className={styles.closeBtn} onClick={() => closePdf()}>
          close pdf
        </button>
      </div>
    </div>
  );
}

export default PdfViewer;
