import styles from "./client-dashboard.module.scss";
import Button from "../../components/button/button";
import { getAuth, signOut } from "firebase/auth";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";
import { useEffect, useState } from "react";
import { fetchAgreementsByClientId } from "../../firebase/agreement";
import { useNavigate } from "react-router-dom";

function ClientDashboard({ currentUser, setCurrentUser, setFlash }) {
  const auth = getAuth();
  const navigate = useNavigate();
  console.log({ currentUser });
  const [agreements, setAgreements] = useState([]);

  console.log({ agreements });
  async function handleSignOut() {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setFlash({
        type: "success",
        message: "Signed out successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFetchMyAgreements() {
    console.log("fetching agreements");
    // const agreements = await fetchAgreementsByClientId(currentUser.uid);
    const agreements = await fetchAgreementsByClientId(
      currentUser.uid,
      currentUser.phone
    );
    setAgreements(agreements);
  }

  useEffect(() => {
    handleFetchMyAgreements();
  }, []);
  return (
    <div className={styles.dashboard}>
      <div className={styles.head}>
        <h2>My Agreements</h2>
        <Button fit outlined danger onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Client Name</th>
              <th>Representative Name</th>
              <th>Client Address</th>
              <th>Contracts</th>
              <th>Added On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agreement, i) => {
              const addedOnDate = new Date(agreement?.createdAt).toDateString();
              const addedOnTime = new Date(
                agreement?.createdAt
              ).toLocaleTimeString();
              return (
                <tr
                  className={styles.agreementRecord}
                  key={agreement?.id}
                  onClick={() => navigate("/contracts/" + agreement?.id)}
                  // onClick={() => setViewAgreement(agreement)}
                >
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
    </div>
  );
}
const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapState, { setCurrentUser, setFlash })(ClientDashboard);
