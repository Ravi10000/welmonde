import styles from "./admin-record.module.scss";
import Button from "./../../../components/button/button";
import { deleteUser } from "../../../firebase/auth";
import { useState } from "react";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";
import Actions from "../../../components/actions/actions";

function AdminRecord({
  admin,
  setAdminToEdit,
  openPopup,
  setFlash,
  handleFetchAdmins,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  async function handleDeleteAdmin() {
    setIsDeleting(true);
    try {
      await deleteUser(admin?.uid);
      await handleFetchAdmins();
      setFlash({
        message: "Admin deleted successfully",
        type: "success",
      });
    } catch (err) {
      setFlash({
        message: err.message,
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <tr>
      <td className={styles.recordData}>{admin?.fname + " " + admin?.lname}</td>
      <td className={styles.recordData}>{admin?.email}</td>
      <td className={styles.recordData}>{admin?.mobile}</td>
      <td className={styles.recordData}>{admin?.contractsGenerated}</td>
      <td className={styles.recordData}>{admin?.contractsVerified}</td>
      <td className={`${styles.recordData} ${styles.actions}`}>
        <Actions
          handleDelete={handleDeleteAdmin}
          handleEdit={() => {
            setAdminToEdit(admin);
            openPopup();
          }}
          isDeleting={isDeleting}
        />
      </td>
    </tr>
  );
}

export default connect(null, { setFlash })(AdminRecord);
