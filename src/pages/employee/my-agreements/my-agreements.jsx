import styles from "./my-agreements.module.scss";
import { useEffect, useState } from "react";
import { fetchMyAgreements } from "../../../firebase/employee";
import { connect } from "react-redux";
import Button from "../../../components/button/button";
import AddAgreementsPopup from "../../../components/add-agreements-popup/add-agreements-popup";
import AgreementRecord from "./agreement-record/agreement-record";

function MyAgreementsPage({ currentUser }) {
  const [agreements, setAgreements] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

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
  async function handleFetchAgreements() {
    const agreements = await fetchMyAgreements(currentUser.uid);
    console.log(agreements);
    setAgreements(agreements);
  }
  useEffect(() => {
    handleFetchAgreements();
  }, []);
  return (
    <div className={styles.myAgreementsPage}>
      {showPopup && (
        <AddAgreementsPopup
          closePopup={closePopup}
          onSuccess={handleFetchAgreements}
        />
      )}
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
          <h1>My Agreements</h1>
          <Button outlined fit onClick={openPopup}>
            Add New Agreement
          </Button>
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
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((agreement, i) => (
                <AgreementRecord
                  onSuccess={handleFetchAgreements}
                  key={agreement?.id}
                  agreement={agreement}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(MyAgreementsPage);
