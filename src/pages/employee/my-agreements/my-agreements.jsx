import styles from "./my-agreements.module.scss";
import { useEffect, useState } from "react";
import { fetchMyAgreements } from "../../../firebase/employee";
import { connect } from "react-redux";
import Button from "../../../components/button/button";
import AddAgreementsPopup from "../../../components/add-agreements-popup/add-agreements-popup";

function MyAgreementsPage({ currentUser }) {
  const [agreements, setAgreements] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  console.log({ currentUser });
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
                <th>Client Name</th>
                <th>Client Address</th>
                <th>Contracts</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((agreement, i) => (
                <tr key={agreement?.id}>
                  <td>{agreement?.clientName}</td>
                  <td>{agreement?.clientAddress}</td>
                  <td className={styles.contractNamesContainer}>
                    {agreement?.contracts?.map((contract) => (
                      <p key={contract} className={styles.contractName}>
                        {contract}
                      </p>
                    ))}
                  </td>
                </tr>
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
