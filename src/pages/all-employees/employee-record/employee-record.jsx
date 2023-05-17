import styles from "./employee-record.module.scss";
import Button from "../../../components/button/button";
import { connect } from "react-redux";
import { deleteUser } from "../../../firebase/auth";
import { setFlash } from "../../../redux/flash/flash.actions";
import { useState } from "react";
import Actions from "../../../components/actions/actions";

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
        message: "Employee deleted successfully",
        type: "success",
      });
      await handleFetchEmployees();
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
      <td>{employee?.fname + " " + employee?.lname}</td>
      <td>{employee?.email}</td>
      <td>{employee?.mobile}</td>
      <td>{employee?.contractsGenerated}</td>
      <td>{employee?.contractsVerified}</td>
      <td>
        <Actions
          handleDelete={handleDeleteEmployee}
          handleEdit={() => {
            setEmployeeToEdit(employee);
            openPopup();
          }}
          isDeleting={isDeleting}
        />
      </td>
    </tr>
  );
}

export default connect(null, { setFlash })(EmployeeRecord);
