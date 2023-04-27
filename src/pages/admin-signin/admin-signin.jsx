import styles from "./admin-signin.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInAdmin } from "../../firebase/auth";
// components
import Button from "../../components/button/button";
import InputBox from "../../components/input/input";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

function AdminSigninPage({ setCurrentUser, setFlash }) {
  const navigate = useNavigate();
  const [verifing, setVerifing] = useState(false);

  async function handleSignInAdmin(e) {
    setVerifing(true);
    e.preventDefault();
    const { email, password } = e.target.elements;
    const emailValue = email.value;
    const passwordValue = password.value;
    console.log(emailValue, passwordValue);

    try {
      const response = await signInAdmin(emailValue, passwordValue);
      if (response.error) {
        return setFlash({
          type: "error",
          message: response.error,
        });
      }
      if (response?.email)
        setCurrentUser({ email: response?.email, userType: "ADMIN" });
      setFlash({
        type: "success",
        message: "Admin Signed in successfully",
      });
      navigate("/admins");
    } catch (err) {
      console.log(err);
    } finally {
      setVerifing(false);
    }
  }
  return (
    <div className={styles.signinPage}>
      <section className={styles.signinHero}></section>
      <section className={styles.signinSection}>
        <div className={styles.content}>
          <img className={styles.logo} src="/logo-transparent.png" alt="" />
        </div>
        <h1>Admin Sign in</h1>
        <form onSubmit={handleSignInAdmin}>
          <div className={styles.inputsContainer}>
            <InputBox name="email" label="email" placeholder="Enter Email" />
            <InputBox
              name="password"
              label="password"
              type="password"
              placeholder="Enter Password"
            />
            <p className={styles.fp}>forgot password?</p>
            <Button fit isLoading={verifing}>
              Sign in
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default connect(null, { setCurrentUser, setFlash })(AdminSigninPage);
