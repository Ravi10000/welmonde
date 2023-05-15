import styles from "./employee-record.module.scss";
import Button from "../../../components/button/button";
import { connect } from "react-redux";
import { deleteUser } from "../../../firebase/auth";
import { setFlash } from "../../../redux/flash/flash.actions";
import { useState } from "react";

function EmployeeRecord({
  employee,
  setEmployeeToEdit,
  openPopup,
  setFlash,
  handleFetchEmployees,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteEmployee() {
    setIsDeleting(true);
    try {
      await deleteUser(employee?.uid);
      setFlash({
        message: "Admin deleted successfully",
        type: "success",
      });
      await handleFetchEmployees();
    } catch (err) {
      setFlash({
        message: err.message,
        type: "error",
      });
    }
  }
  return (
    <div className={styles.employeeRecord}>
      <div className={styles.recordData}>
        {employee?.fname + " " + employee?.lname}
      </div>
      <div className={styles.recordData}>{employee?.email}</div>
      <div className={styles.recordData}>{employee?.mobile}</div>
      <div className={styles.recordData}>{employee?.contractsGenerated}</div>
      <div className={styles.recordData}>{employee?.contractsVerified}</div>
      <div className={`${styles.recordData} ${styles.actions}`}>
        <Button
          fit
          action
          iconOnly
          onClick={() => {
            setEmployeeToEdit(employee);
            openPopup();
          }}
        >
          <img src="/actions/edit.png" alt="" />
        </Button>
        <Button fit destruct iconOnly onClick={handleDeleteEmployee}>
          <img src="/actions/delete.png" alt="" />
        </Button>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(EmployeeRecord);
