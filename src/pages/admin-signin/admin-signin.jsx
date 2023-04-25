import styles from "./admin-signin.module.scss";
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/button";
import InputBox from "../../components/input/input";

function AdminSigninPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.signinPage}>
      <section className={styles.signinHero}>
        {/* <div className={styles.content}>
          <img className={styles.logo} src="/logo-transparent.png" alt="" />
          <h1 className="__subColorHeading">Get Started</h1>
        </div> */}
      </section>
      <section className={styles.signinSection}>
        <div className={styles.content}>
          <img className={styles.logo} src="/logo-transparent.png" alt="" />
          {/* <h1 className="__subColorHeading">Get Started</h1> */}
        </div>
        <h1>Admin Sign in</h1>
        <div className={styles.inputsContainer}>
          <InputBox label="email" placeholder="Enter Email" />
          <InputBox
            label="password"
            type="password"
            placeholder="Enter Password"
          />
          <p className={styles.fp}>forgot password?</p>
          <Button fit onClick={() => navigate("/admins")}>
            Sign in
          </Button>
        </div>
      </section>
    </div>
  );
}

export default AdminSigninPage;
