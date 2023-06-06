import React, { useEffect, useState } from "react";
import { fetchClientById } from "../../firebase/employee";
import ContractAll from "./contract-all";
import ContractPharmacy from "./contract-pharmacy";
import ContractMou from "./contract-mou";
import ContractIS from "./contract.is";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { isMobile } from "react-device-detect";

import styles from "./contract-pdf.module.scss";
// Create Document Component
function ContractPdf({ contract }) {
  const [client, setClient] = useState(null);
  console.log({ contract, client });
  const [isFetching, setIsFetching] = useState(false);
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
  // else
  //   pdf = (
  // <PDFDownloadLink
  //   fileName="digiagreements contract.pdf"
  //   document={<ContractAll client={client} contract={contract} />}
  // >
  //   {({ url, loading }) => {
  //     return loading ? <p>loading...</p> : <p>Download contract PDF</p>;
  //   }}
  // </PDFDownloadLink>
  //   );
  return (
    <>
      {/* {pdf} */}
      {isFetching ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : isMobile ? (
        <PDFDownloadLink fileName="digiagreements contract.pdf" document={pdf}>
          {({ url, loading }) => {
            return loading ? (
              <p>loading...</p>
            ) : (
              <button className={styles.downloadBtn}>
                <img src="/download.png" alt="" />
                <p>Download contract PDF</p>
              </button>
            );
          }}
        </PDFDownloadLink>
      ) : (
        <PDFViewer>{pdf}</PDFViewer>
      )}
    </>
  );
}

export default ContractPdf;
