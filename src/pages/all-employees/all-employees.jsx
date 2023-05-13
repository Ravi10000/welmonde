import styles from "./all-employees.module.scss";
import Button from "../../components/button/button";
import { useState, useEffect } from "react";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { fetchAllEmployees } from "../../firebase/auth";
import EmployeeRecord from "./employee-record/employee-record";
import EmployeePopup from "./employee-popup";
import { fetchMyAgreements } from "../../firebase/employee";

function AllEmployeesPage({ setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [totalContractsVerified, setTotalContractsVerified] = useState(0);
  const [totalContractsGenerated, setTotalContractsGenerated] = useState(0);

  async function handleFetchEmployees() {
    const employees = await fetchAllEmployees();
    console.log(employees);

    const updatedEmployees = await Promise.all(
      employees.map(async (employee) => {
        const res = await fetchMyAgreements(employee.uid);
        console.log({ res });
        let verified = 0;
        let generated = 0;
        res?.forEach((agreement) => {
          generated++;
          if (agreement?.status === "OTP VERIFIED") verified++;
        });
        employee.contractsVerified = verified;
        employee.contractsGenerated = generated;
        return employee;
      })
    );
    setEmployees(updatedEmployees);
  }
  useEffect(() => {
    handleFetchEmployees();
  }, []);

  useEffect(() => {
    let verified = 0;
    let generated = 0;
    employees?.forEach((admin) => {
      generated += admin?.contractsGenerated;
      verified += admin?.contractsVerified;
    });
    setTotalContractsGenerated(generated);
    setTotalContractsVerified(verified);
  }, [employees]);

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
      <h1 className="__pageHeading __subColorHeading">All Employees</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>{employees?.length}</p>
            <h4>Total Employees</h4>
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
