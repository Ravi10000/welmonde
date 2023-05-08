import styles from "./all-agreements.module.scss";
import { fetchAllAgreements } from "../../firebase/auth";
import { useEffect, useState } from "react";

function AllAgreements() {
  const [agreements, setAgreements] = useState([]);
  async function handleFetchAllAgreements() {
    try {
      const agreements = await fetchAllAgreements();
      setAgreements(agreements);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchAllAgreements();
  }, []);
  return (
    <div className={styles.allAgreementsPage}>
      <main className={styles.pageContent}>
        <div className={styles.head}>
          <h1>All Agreements</h1>
          {/* <Button outlined fit onClick={openPopup}>
            Add New Agreement
          </Button> */}
        </div>
        <div className="__tableContainer">
          <table>
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Client Name</th>
                <th>Representative Name</th>
                <th>Client Address</th>
                {/* <th>Mobile</th> */}
                <th>Contracts</th>
                <th>Added On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((agreement, i) => {
                const addedOnDate = new Date(
                  agreement?.createdAt
                ).toDateString();
                const addedOnTime = new Date(
                  agreement?.createdAt
                ).toLocaleTimeString();
                return (
                  <tr className={styles.agreementRecord} key={agreement?.id}>
                    <td>{agreement?.businessName}</td>
                    <td>{agreement?.clientName}</td>
                    <td>{agreement?.representativeName}</td>
                    <td>{agreement?.clientAddress}</td>
                    {/* <td>{agreement?.mobile}</td> */}
                    <td className={styles.contractNamesContainer}>
                      {agreement?.contracts?.map((contract) => (
                        <p key={contract} className={styles.contractName}>
                          {contract}
                        </p>
                      ))}
                    </td>
                    <td>
                      {addedOnDate}, {addedOnTime}
                    </td>
                    <td>{agreement?.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AllAgreements;
