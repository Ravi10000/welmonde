import styles from "./all-admins.module.scss";
import Button from "../../components/button/button";
import { useState, useEffect } from "react";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { fetchAllAdmins } from "../../firebase/auth";
import AdminRecord from "./admin-record/admin-record";
import AdminPopup from "./admin-popup";

function AllAdminsPage({ setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminToEdit, setAdminToEdit] = useState(null);

  async function handleFetchAdmins() {
    const admins = await fetchAllAdmins();
    console.log(admins);
    setAdmins(admins);
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
      <h1 className="__pageHeading __subColorHeading">All Admins</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>{admins?.length}</p>
            <h4>Total Admins</h4>
          </div>
          <div className={styles.card}>
            <p>1200</p>
            <h4>Contracts Generated</h4>
          </div>
          <div className={styles.card}>
            <p>120</p>
            <h4>Contracts Signed</h4>
          </div>
        </section>
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
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div className={styles.columnTitle}>Admin Name</div>
            <div className={styles.columnTitle}>Admin Email</div>
            <div className={styles.columnTitle}>Admin Phone</div>
            <div className={styles.columnTitle}>Total Contracts Generated</div>
            <div className={styles.columnTitle}>Total Contracts Signed</div>
            <div className={styles.columnTitle}>Edit Admins</div>
          </div>
          <div className={styles.tableBody}>
            {admins?.map((admin, i) => (
              <AdminRecord
                handleFetchAdmins={handleFetchAdmins}
                admin={admin}
                key={i}
                setAdminToEdit={setAdminToEdit}
                openPopup={() => setShowPopup(true)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AllAdminsPage);
