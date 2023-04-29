import styles from "./admin-signin.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInAdmin } from "../../firebase/auth";
// components
import Button from "../../components/button/button";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";
import TextInput from "../../components/text-input/text-input";
import { useForm } from "react-hook-form";

function AdminSigninPage({ setCurrentUser, setFlash }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "password",
    },
  });

  const navigate = useNavigate();
  const [verifing, setVerifing] = useState(false);

  async function handleSignInAdmin(data) {
    setVerifing(true);
    console.log({ data });
    try {
      const response = await signInAdmin(data.email, data.password);
      if (response.error) {
        return setFlash({
          type: "error",
          message: response.error,
        });
      }
      if (response) navigate("/admins");
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
        <form onSubmit={handleSubmit(handleSignInAdmin)} noValidate>
          <div className={styles.inputsContainer}>
            <TextInput
              type="email"
              label="Email"
              placeholder="Enter Email"
              error={errors?.email?.message}
              register={{
                ...register("email", {
                  required: "Enter Email ",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Not a valid Email Id",
                  },
                }),
              }}
            />
            <TextInput
              type="password"
              label="Password"
              placeholder="Enter Password"
              error={errors?.password?.message}
              register={{
                ...register("password", {
                  required: "Enter password",
                }),
              }}
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
