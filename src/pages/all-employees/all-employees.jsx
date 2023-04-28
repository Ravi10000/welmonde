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
import { auth, createAdminProfileDocument } from "../../firebase/auth";

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
  const [isLoading, setIsLoading] = useState(false);

  async function handleFetchEmployees() {
    const employees = await fetchAllEmployees();
    console.log(employees);
    setEmployees(employees);
  }
  useEffect(() => {
    handleFetchEmployees();
  }, []);

  async function handleEmployeeCreation(data) {
    setIsLoading(true);
    const { fname, lname, email, mobile, password } = data;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createAdminProfileDocument(user, {
        fname,
        lname,
        mobile,
        usertype: "EMPLOYEE",
      });
      await handleFetchEmployees();
      setFlash({ message: "Employee Created Successfully", type: "success" });
      setShowPopup(false);
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
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
        <form onSubmit={handleSubmit(handleEmployeeCreation)} noValidate>
          <Popup
            isLoading={isLoading}
            title="Create New Admin"
            closePopup={() => setShowPopup(false)}
          >
            <TextInput
              label="First Name"
              placeholder="Enter First Name"
              error={errors?.fname?.message}
              register={{
                ...register("fname", {
                  required: "Enter First Name",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "only alphabets are allowed",
                  },
                }),
              }}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter Last Name"
              error={errors?.lname?.message}
              register={{
                ...register("lname", {
                  required: "Enter Last Name",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "only alphabets are allowed",
                  },
                }),
              }}
            />
            <TextInput
              label="Email"
              placeholder="Enter Admin Email Id"
              error={errors?.email?.message}
              register={{
                ...register("email", {
                  required: "Enter Email Id",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Not a valid Email Id",
                  },
                }),
              }}
            />
            <NumInput
              maxLength={10}
              label="Mobile Number"
              placeholder="Enter Admin Mobile Number"
              error={errors?.mobile?.message}
              register={{
                ...register("mobile", {
                  required: "Enter Mobile Number",
                  minLength: {
                    value: 10,
                    message: "Mobile Number should be 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Mobile Number should be 10 digits",
                  },
                }),
              }}
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter Admin Password"
              error={errors?.password?.message}
              register={{
                ...register("password", {
                  required: "Enter password",
                }),
              }}
            />
            <TextInput
              label="Confirm Password"
              type="password"
              placeholder="Enter Same Password As Above"
              error={errors?.confirmPassword?.message}
              register={{
                ...register("confirmPassword", {
                  required: "Confirm your password ",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }),
              }}
            />
          </Popup>
        </form>
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
            <p>12000</p>
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
        <table>
          <thead>
            <tr>
              {/* <th>
                <input type="checkbox" />
              </th> */}
              <th>
                Employee Name <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Employee Email <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Employee Phone <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Generated <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Signed <img src="/sorting.png" alt="sort" />
              </th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, i) => (
              <tr key={i}>
                <td>{employee?.fname + " " + employee?.lname}</td>
                <td>{employee?.email}</td>
                <td>{employee?.mobile}</td>
                <td>102</td>
                <td>102</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AllEmployeesPage);
