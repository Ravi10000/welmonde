import styles from "./view-agreement-popup.module.scss";
import { useEffect, useState } from "react";

import Backdrop from "../../../components/backdrop/backdrop";
import PdfViewer from "../../../components/pdf-viewer/pdf-viewer";
import { fetchClienDetails } from "../../../firebase/auth";

function ViewAgreementPopup({ agreement, closeAgreement }) {
  const [contract, setContract] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  console.log({ agreement });
  console.log({ contract });
  const addedOnDate = new Date(agreement?.createdAt).toDateString();
  const addedOnTime = new Date(agreement?.createdAt).toLocaleTimeString();

  const handleFetchClientDetails = async () => {
    console.log({ clientId: agreement?.clientId });
    const client = await fetchClienDetails(agreement?.clientId);
    console.log({ client });
    setClientDetails(client);
  };
  useEffect(() => {
    handleFetchClientDetails();
  }, []);
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
            <h1 className={styles.title}>Agreement Details</h1>
            <div className={styles.closeIcon} onClick={closeAgreement}>
              <img src="/close.png" alt="" />
            </div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.data}>
              <h3>Client Name:</h3>
              <p>{agreement?.clientName}</p>
            </div>
            <div className={styles.data}>
              <h3>Business Name:</h3>
              <p>{agreement?.businessName}</p>
            </div>
            <div className={styles.data}>
              <h3>Representative Name:</h3>
              <p>{agreement?.representativeName}</p>
            </div>
            <div className={styles.data}>
              <h3>Phone Number:</h3>
              <p>{clientDetails?.mobile}</p>
            </div>
            {clientDetails?.email && (
              <div className={styles.data}>
                <h3>Email:</h3>
                <p>{clientDetails?.email}</p>
              </div>
            )}
            <div className={styles.data}>
              <h3>Address:</h3>
              <p>{agreement?.clientAddress}</p>
            </div>
            <div className={styles.data}>
              <h3>Added On:</h3>
              <p>
                {addedOnDate}, {addedOnTime}
              </p>
            </div>
            <div className={styles.data}>
              <h3>Status:</h3>
              <p>{agreement?.status}</p>
            </div>
          </div>
          <h3>Contracts:</h3>
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
