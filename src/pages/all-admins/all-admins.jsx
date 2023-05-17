import styles from "./all-admins.module.scss";
import Button from "../../components/button/button";
import { useState, useEffect } from "react";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { fetchAllAdmins } from "../../firebase/admin";
import AdminRecord from "./admin-record/admin-record";
import AdminPopup from "./admin-popup";
import { fetchMyAgreements } from "../../firebase/employee";

function AllAdminsPage({ setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminToEdit, setAdminToEdit] = useState(null);

  const [totalContractsVerified, setTotalContractsVerified] = useState(0);
  const [totalContractsGenerated, setTotalContractsGenerated] = useState(0);

  console.log({ admins });
  useEffect(() => {
    let verified = 0;
    let generated = 0;
    admins?.forEach((admin) => {
      generated += admin?.contractsGenerated;
      verified += admin?.contractsVerified;
    });
    setTotalContractsGenerated(generated);
    setTotalContractsVerified(verified);
  }, [admins]);

  async function handleFetchAdmins() {
    console.log("fetching admins");
    let admins = await fetchAllAdmins();
    const updatedAdmins = await Promise.all(
      admins.map(async (admin) => {
        const res = await fetchMyAgreements(admin.uid);
        console.log({ res });
        let verified = 0;
        let generated = 0;
        res?.forEach((agreement) => {
          generated++;
          if (agreement?.status === "OTP VERIFIED") verified++;
          console.log(agreement?.status);
        });
        admin.contractsVerified = verified;
        admin.contractsGenerated = generated;
        return admin;
        console.log({ verified, generated });
        // console.log({ status: res?.status });
      })
    );
    console.log({ updatedAdmins });
    setAdmins(updatedAdmins);
  }

  useEffect(() => {
    handleFetchAdmins();
  }, []);

  return (
    <div className={styles.allAdmins}>
      {showPopup && (
        <AdminPopup
          setAdminToEdit={setAdminToEdit}
          adminToEdit={adminToEdit}
          onSuccess={handleFetchAdmins}
          closePopup={() => {
            setShowPopup(false);
          }}
        />
      )}
      <section className={styles.cardsContainer}>
        <div className={styles.card}>
          <p>{admins?.length}</p>
          <h4>Total Admins</h4>
        </div>
        <div className={styles.card}>
          <p>{totalContractsGenerated}</p>
          <h4>Contracts Generated</h4>
        </div>
        <div className={styles.card}>
          <p>{totalContractsVerified}</p>
          <h4>Contracts Signed</h4>
        </div>
      </section>
      <div className={styles.head}>
        <h1 className="__pageHeading __subColorHeading">All Admins</h1>
        <Button
          outlined
          fit
          icon={"/add-user.png"}
          hoverIcon={"/add-user-hover.png"}
          onClick={() => setShowPopup(true)}
        >
          <p>Add Admin</p>
        </Button>
      </div>
      <div className="__tableContainer">
        <table>
          <thead>
            <th>Admin Name</th>
            <th>Admin Email</th>
            <th>Admin Phone</th>
            <th>Contracts Generated</th>
            <th>Contracts Signed</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {admins?.map((admin, i) => (
              <AdminRecord
                handleFetchAdmins={handleFetchAdmins}
                admin={admin}
                key={i}
                setAdminToEdit={setAdminToEdit}
                openPopup={() => setShowPopup(true)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AllAdminsPage);
