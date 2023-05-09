import styles from "./pdf-viewer.module.scss";
import ScrollToTop from "../scrollToTop";

function PdfViewer({ pdfLink, closePdf, ...props }) {
  return (
    <div className={styles.pdfViewer}>
      <ScrollToTop />
      <div className={styles.pdfContainer}>
        <iframe className={styles.pdf} src={pdfLink}></iframe>
        <button className={styles.closeBtn} onClick={closePdf}>
          close pdf
        </button>
      </div>
    </div>
  );
}

export default PdfViewer;
