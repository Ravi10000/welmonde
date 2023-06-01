import styles from "./add-user-popup.module.scss";
import Popup from "../popup/popup";
import TextInput from "../text-input/text-input";
import NumInput from "../num-input/num-input";
import { detatchAuth } from "../../firebase";
import { useForm } from "react-hook-form";
import { setFlash } from "../../redux/flash/flash.actions";
import { addNewClient, createUserProfile } from "../../firebase/auth";

function AddUserPopup({ usertype, onUserAdded, setFlash }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "test",
      lname: "test",
      email: "test@email.com",
      mobile: "0000000000",
      password: "password",
      confirmPassword: "password",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleUserCreation(data) {
    setIsLoading(true);
    const { fname, lname, email, mobile, password } = data;
    const userDetails = {
      fname,
      lname,
      mobile,
      usertype: usertype.toUpperCase(),
    };
    try {
      const { user } = await createUserWithEmailAndPassword(
        detatchAuth,
        email,
        password
      );
      await createUserProfile(user, userDetails);
      await onUserAdded();
      setFlash({
        type: "success",
        message: `${usertype} Created Successfully`,
      });
      setShowPopup(false);
      return reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleUserCreation)} noValidate>
      <Popup
        isLoading={isLoading}
        title={`Create New ${usertype}`}
        closePopup={() => setShowPopup(false)}
      >
        <TextInput
          label="First Name"
          placeholder="Enter First Name"
          error={errors?.fname?.message}
          register={{
            ...register("fname", {
              required: "Enter First Name",
               
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
  );
}

export default connect(null, { setFlash })(AddUserPopup);
