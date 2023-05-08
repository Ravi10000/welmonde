import styles from "./all-agreements.module.scss";
import { fetchAllAgreements } from "../../firebase/auth";
import { useEffect, useState } from "react";

function AllAgreements() {
  const [agreements, setAgreements] = useState([]);
  let noOfVerifed = 0;
  let noOfDenied = 0;
  let noOfFollowedUp = 0;
  let noOfSent = 0;

  agreements?.forEach((agreement) => {
    if (agreement?.status === "OTP VERIFIED") {
      noOfVerifed++;
    } else if (agreement?.status === "DENIED") {
      noOfDenied++;
    } else if (agreement?.status === "FOLLOWED UP") {
      noOfFollowedUp++;
    } else if (agreement?.status === "SENT TO CLIENT") {
      noOfSent++;
    }
  });
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
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>{agreements?.length}</p>
            <h4>Total Agreements</h4>
          </div>
          <div className={styles.card}>
            <p>{noOfVerifed}</p>
            <h4>Agreements Verified</h4>
          </div>
          <div className={styles.card}>
            <p>{noOfSent}</p>
            <h4>Agreements Sent to Client</h4>
          </div>
          <div className={styles.card}>
            <p>{noOfFollowedUp}</p>
            <h4>Agreements Followed Up</h4>
          </div>
          <div className={styles.card}>
            <p>{noOfDenied}</p>
            <h4>Agreements Denied</h4>
          </div>
        </section>
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
