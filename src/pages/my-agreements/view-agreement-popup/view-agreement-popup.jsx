import styles from "./view-agreement-popup.module.scss";
import { useEffect, useState } from "react";

import Backdrop from "../../../components/backdrop/backdrop";
import PdfViewerContainer from "../../../components/pdf-viewer/pdf-viewer";
import { fetchClienDetails, fetchUser } from "../../../firebase/auth";

function ViewAgreementPopup({ agreement, closeAgreement }) {
  const [contract, setContract] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  console.log({ agreement });
  console.log({ contract });
  // const addedOnDate = new Date(agreement?.createdAt).toDateString();
  // const addedOnTime = new Date(agreement?.createdAt).toLocaleTimeString();

  const handleFetchClient_n_EmployeeDetails = async () => {
    console.log({ clientId: agreement?.clientId });
    const client = await fetchClienDetails(agreement?.clientId);
    const employee = await fetchUser(agreement?.employeeId);
    console.log({ employee });
    console.log({ client });
    setEmployeeDetails(employee);
    setClientDetails(client);
  };
  useEffect(() => {
    handleFetchClient_n_EmployeeDetails();
  }, []);
  return (
    <>
      {contract && (
        <PdfViewerContainer
          contract={contract}
          closePdf={() => {
            setContract(null);
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
            <h2  className={styles.subtitle}>Client Details</h2>
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
                {/* {addedOnDate}, {addedOnTime} */}
                {agreement.createdAt.toDate().toDateString()}
              </p>
            </div>
            <div className={styles.data}>
              <h3>Status:</h3>
              <p>{agreement?.status}</p>
            </div>
            <br />
            <h2  className={styles.subtitle}>Employee Details</h2>
            <div className={styles.data}>
              <h3>Employee Name:</h3>
              <p>
                {employeeDetails?.fname} {employeeDetails?.lname}
              </p>
            </div>
            <div className={styles.data}>
              <h3>Employee Email:</h3>
              <p>{employeeDetails?.email}</p>
            </div>
            <div className={styles.data}>
              <h3>Employee Mobile:</h3>
              <p>{employeeDetails?.mobile}</p>
            </div>
          </div>
          <br />
          <h2 className={styles.subtitle}>Contracts:</h2>
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
