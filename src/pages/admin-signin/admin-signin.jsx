import styles from "./admin-signin.module.scss";

// components
import Button from "../../components/button/button";
import InputBox from "../../components/input/input";

function AdminSigninPage() {
  return (
    <div className={styles.signinPage}>
      <h1>Admin Sign in</h1>
      <div className={styles.inputsContainer}>
        <InputBox label="email" placeholder="Enter Email" />
        <InputBox
          label="password"
          type="password"
          placeholder="Enter Password"
        />
        <Button fit>Sign in</Button>
      </div>
    </div>
  );
}

export default AdminSigninPage;
