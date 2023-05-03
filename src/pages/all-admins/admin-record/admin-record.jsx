import styles from "./admin-record.module.scss";
import Button from "./../../../components/button/button";
import { deleteUser } from "../../../firebase/auth";
import { useState } from "react";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function AdminRecord({
  admin,
  setAdminToEdit,
  openPopup,
  setFlash,
  handleFetchAdmins,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className={styles.adminRecord}>
      <div className={styles.recordData}>
        {admin?.fname + " " + admin?.lname}
      </div>
      <div className={styles.recordData}>{admin?.email}</div>
      <div className={styles.recordData}>{admin?.mobile}</div>
      <div className={styles.recordData}>102</div>
      <div className={styles.recordData}>102</div>
      <div className={`${styles.recordData} ${styles.actions}`}>
        <Button
          action
          iconOnly
          onClick={() => {
            setAdminToEdit(admin);
            openPopup();
          }}
        >
          <img src="/actions/edit.png" alt="" />
        </Button>
        <Button
          destruct
          iconOnly
          onClick={async () => {
            try {
              await deleteUser(admin?.uid);
              setFlash({
                message: "Admin deleted successfully",
                type: "success",
              });
              await handleFetchAdmins();
            } catch (err) {
              setFlash({
                message: err.message,
                type: "error",
              });
            }
          }}
        >
          <img src="/actions/delete.png" alt="" />
        </Button>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AdminRecord);
