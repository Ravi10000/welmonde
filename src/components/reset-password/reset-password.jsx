import styles from "./reset-password.module.scss";
import Popup from "../popup/popup";
import TextInput from "../text-input/text-input";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../firebase/resetPassword";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { auth } from "../../firebase/auth";
function ResetPasswordForm({ closePopup, setFlash }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleSendResetPasswordEmail(data) {
    console.log({ data });
    try {
      const response = await resetPassword(auth, data.email);
      if (response.error) {
        return console.log(response.error);
      }
      setFlash({
        message: "Password Reset Email Sent, check your inbox",
        type: "success",
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit(handleSendResetPasswordEmail)}>
      <Popup
        closePopup={closePopup}
        save="Send Password Reset Email"
        title="Reset Password"
      >
        <TextInput
          label="Email"
          placeholder="Enter your email address"
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
      </Popup>
    </form>
  );
}

export default connect(null, { setFlash })(ResetPasswordForm);
