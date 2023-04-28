import styles from "./all-admins.module.scss";
import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";
import { useState, useEffect } from "react";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createAdminProfileDocument } from "../../firebase/auth";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { fetchAllAdmins } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { detatchApp } from "../../firebase";
import { getAuth } from "firebase/auth";

function AllAdminsPage({ setFlash }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showPopup, setShowPopup] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFetchAdmins() {
    const admins = await fetchAllAdmins();
    console.log(admins);
    setAdmins(admins);
  }
  useEffect(() => {
    handleFetchAdmins();
  }, []);

  async function handleAdminCreation(data) {
    setIsLoading(true);
    const { fname, lname, email, mobile, password } = data;
    const auth = getAuth(detatchApp);
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
        usertype: "ADMIN",
      });
      await handleFetchAdmins();
      setFlash({ message: "Admin Created Successfully", type: "success" });
      setShowPopup(false);
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.allAdmins}>
      {showPopup && (
        <form onSubmit={handleSubmit(handleAdminCreation)} noValidate>
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
      <h1 className="__pageHeading __subColorHeading">All Admins</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>12000</p>
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
        <table>
          <thead>
            <tr>
              {/* <th>
                <input type="checkbox" />
              </th> */}
              <th>
                Admin Name <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Admin Email
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Admin Phone <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Generated
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>Total Contracts Signed</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin, i) => (
              <tr key={i}>
                <td>{admin?.fname + " " + admin?.lname}</td>
                <td>{admin?.email}</td>
                <td>{admin?.mobile}</td>
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

export default connect(null, { setFlash })(AllAdminsPage);
