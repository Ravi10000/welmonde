import styles from "./pdf-viewer.module.scss";
import ScrollToTop from "../scrollToTop";
import ContractPdf from "../contract-pdf/contract-pdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { isMobile } from "react-device-detect";

function PdfViewerContainer({ contract, closePdf, ...props }) {
  return (
    <div className={`${styles.pdfViewer}`}>
      <ScrollToTop />
      <div
        className={`${styles.pdfContainer} ${isMobile && styles.mobileView}`}
      >
        <ContractPdf contract={contract} />
        <button
          className={styles.closeBtn}
          onClick={() => {
            console.log("close pdf");
            closePdf();
          }}
        >
          <img src="/close-pdf.png" alt="close pdf" />
        </button>
      </div>
    </div>
  );
}

export default PdfViewerContainer;
