import styles from "./login.module.scss";

// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

// components
import Button from "../../components/button/button";
import TextInput from "../../components/text-input/text-input";

// api calls
import { signin } from "../../api/users";

// redux actions
import { setCurrentUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

function LoginPage({ setCurrentUser, setFlash }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignin(formData) {
    setIsLoading(true);
    try {
      const response = await signin(formData);
      console.log({ response });
      if (response.data.status === "warning") {
        console.log(response.data);
        return setFlash({
          type: "warning",
          message: response.data.message,
        });
      }
      if (response.data.status === "error") {
        console.log(response.data);
        return setFlash({
          type: "error",
          message: response.data.message,
        });
      }
      if (response.data.status === "not verified") {
        navigate("/verify-email", {
          state: { email: formData?.email },
        });
        return setFlash({
          type: "success",
          message: "Verification email sent, please verify your email",
        });
      }
      if (response.data.status === "success") {
        localStorage.setItem("authToken", response.data.authToken);
        console.log(response.data.user);
        setCurrentUser(response.data.user);
        setFlash({
          type: "success",
          message: "Login Successful",
        });
        navigate("/search");
      }
    } catch (err) {
      setFlash({
        type: "error",
        message: err.message,
      });
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.signupHero}>
        <div className={styles.content}>
          <img src="/logo-light.png" alt="" />
          <h1 className={styles.title}>Welcome to the community</h1>
        </div>
      </div>
      <section className={styles.loginSection}>
        <h2 className="__sectionTitle">Account Login</h2>
        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(handleSignin)}
          noValidate
        >
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter Email Id"
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
            label="Password"
            type="password"
            placeholder="Enter Password"
            error={errors?.password?.message}
            register={{
              ...register("password", {
                required: "Enter password",
              }),
            }}
          />
          <Button primary isLoading={isLoading}>
            Continue
          </Button>
        </form>
        <p className={styles.signupLink} onClick={() => navigate("/signup")}>
          Don't have an account? <span>Signup</span>
        </p>
      </section>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
