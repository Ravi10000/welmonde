import styles from "./contract-pdf.module.scss";

import React, { useEffect, useState } from "react";
import { fetchClientById } from "../../firebase/employee";
import ContractAll from "./contract-all";
import ContractPharmacy from "./contract-pharmacy";
import ContractMou from "./contract-mou";
import ContractIS from "./contract.is";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { connect } from "react-redux";

// Create Document Component
function ContractPdf({ contract, currentUser }) {
  const [client, setClient] = useState(null);
  console.log({ contract, client });
  const [isFetching, setIsFetching] = useState(false);
  const [pdfLength, setPdfLength] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  async function handleNextPage() {
    if (currentPage >= pdfLength) return;
    setCurrentPage((prev) => prev + 1);
  }
  async function handlePrevPage() {
    if (currentPage <= 1) return;
    setCurrentPage((prev) => prev - 1);
  }

  async function handleFetchClient() {
    setIsFetching(true);
    try {
      const res = await fetchClientById(contract?.agreement?.clientId);
      console.log({ res });
      setClient(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    handleFetchClient();
  }, []);
  let pdf = <></>;
  if (isFetching)
    pdf = (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  else if (contract?.contractName === "pharmacy")
    pdf = <ContractPharmacy client={client} contract={contract} />;
  else if (contract?.contractName === "hospital(mou)")
    pdf = <ContractMou client={client} contract={contract} />;
  else if (contract?.contractName === "international service")
    pdf = <ContractIS client={client} contract={contract} />;
  else pdf = <ContractAll client={client} contract={contract} />;
  return (
    <>
      {isFetching ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <BlobProvider document={pdf}>
          {(pdfData) => {
            console.log({ pdfData });
            return pdfData?.loading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
              </div>
            ) : (
              <div className={styles.pdfWithControls}>
                <Document
                  file={pdfData?.url}
                  onLoadSuccess={(documentData) => {
                    console.log({
                      documentData,
                      numOfPage: documentData._pdfInfo.numPages,
                    });
                    setPdfLength(documentData._pdfInfo.numPages);
                  }}
                >
                  <Page
                    pageNumber={currentPage}
                    width={window.innerWidth > 1000 ? 1000 : window.innerWidth}
                  ></Page>
                </Document>
                <div className={styles.pdfControls}>
                  <button
                    className={`${styles.navBtn} ${styles.prev}`}
                    onClick={handlePrevPage}
                  >
                    <img src="/right-arrow.png" alt="previous page" />
                  </button>
                  <p>
                    {currentPage} / {pdfLength}
                  </p>
                  <button
                    className={`${styles.navBtn} ${styles.next}`}
                    onClick={handleNextPage}
                  >
                    <img src="/right-arrow.png" alt="next page" />
                  </button>
                </div>
                {currentUser?.usertype === "ADMIN" && (
                  <PDFDownloadLink
                    document={pdf}
                    fileName={new Date().toDateString() + contract.contractName}
                  >
                    {({ loading }) =>
                      loading ? (
                        <div className={styles.loaderContainer}>
                          <div className={styles.loader}></div>
                        </div>
                      ) : (
                        <button className={styles.downloadBtn}>
                          <img src="/download.png" alt="" />
                          <p>Download Contract</p>
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                )}
              </div>
            );
          }}
        </BlobProvider>
      )}
    </>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(ContractPdf);
