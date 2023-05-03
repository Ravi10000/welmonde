import styles from "./all-employees.module.scss";
import Button from "../../components/button/button";
import { useRef, useState, useEffect } from "react";
import Backdrop from "../../components/backdrop/backdrop";
import Contract from "../all-contracts/contract/contract";
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { fetchAllEmployees } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserProfile } from "../../firebase/auth";
import EmployeeRecord from "./employee-record/employee-record";
import EmployeePopup from "./employee-popup";

function AllEmployeesPage({ setFlash }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [showContracts, setShowContracts] = useState(false);
  const popupRef = useRef();

  const [showPopup, setShowPopup] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState([]);

  async function handleFetchEmployees() {
    const employees = await fetchAllEmployees();
    console.log(employees);
    setEmployees(employees);
  }
  useEffect(() => {
    handleFetchEmployees();
  }, []);

  const contract = {
    name: "Contract Title",
    employee: "some employee",
    status: "pending",
    client: "some client",
  };
  useEffect(() => {
    function handleClosePopup(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowContracts(false);
      }
    }
    addEventListener("mousedown", handleClosePopup);
    return () => {
      removeEventListener("mousedown", handleClosePopup);
    };
  }, [popupRef]);
  return (
    <div className={styles.allEmployees}>
      {showPopup && (
        <EmployeePopup
          setEmployeeToEdit={setEmployeeToEdit}
          closePopup={() => setShowPopup(false)}
          onSuccess={handleFetchEmployees}
          employeeToEdit={employeeToEdit}
        />
      )}
      {showContracts && (
        <Backdrop>
          <div className={styles.contractPopup} ref={popupRef}>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Contract Name</th>
                  <th>Employee</th>
                  <th>Status</th>
                  <th>Client</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array(25)
                  .fill()
                  .map((_, i) => (
                    <Contract contract={contract} />
                  ))}
              </tbody>
            </table>
          </div>
        </Backdrop>
      )}
      <h1 className="__pageHeading __subColorHeading">All Employees</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>{employees?.length}</p>
            <h4>Total Employees</h4>
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
          <p>Add Employee</p>
        </Button>
      </div>
      <div className="__tableContainer">
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div className={styles.columnTitle}>Employee Name</div>
            <div className={styles.columnTitle}>Employee Email</div>
            <div className={styles.columnTitle}>Employee Phone</div>
            <div className={styles.columnTitle}>Total Contracts Generated</div>
            <div className={styles.columnTitle}>Total Contracts Signed</div>
            <div className={styles.columnTitle}>Edit Employee</div>
          </div>
          <div className={styles.tableBody}>
            {employees?.map((employee, i) => (
              <EmployeeRecord
                handleFetchEmployees={handleFetchEmployees}
                employee={employee}
                key={i}
                setEmployeeToEdit={setEmployeeToEdit}
                openPopup={() => {
                  setShowPopup(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AllEmployeesPage);
