import styles from "./all-employees.module.scss";
import Button from "../../components/button/button";
import { useState, useEffect } from "react";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { fetchAllEmployees } from "../../firebase/admin";
import EmployeeRecord from "./employee-record/employee-record";
import EmployeePopup from "./employee-popup";
import { fetchMyAgreements } from "../../firebase/employee";
import DataCardList from "../../components/data-card-list/data-card-list";
import DataCard from "../../components/data-card/data-card";

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
      <DataCardList>
        <DataCard
          data={employees?.length}
          title="No. of Employees"
          icon="/card-icons/user (1).png"
        />
        <DataCard
          data={totalContractsGenerated}
          title="Contracts Generated"
          icon="/card-icons/copy.png"
        />
        <DataCard
          data={totalContractsVerified}
          title="Contracts Verified"
          icon="/card-icons/verify.png"
        />
      </DataCardList>
      <div className={styles.head}>
        <h1 className="__pageHeading __subColorHeading">All Employees</h1>
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
        <table>
          <thead>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Employee Phone</th>
            <th>Contracts Generated</th>
            <th>Contracts Signed</th>
            <th>Actions</th>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AllEmployeesPage);
