import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { useForm } from "react-hook-form";
import { createUserProfile, updateUserDetails } from "../../firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setFlash } from "../../redux/flash/flash.actions";
import { detatchAuth } from "../../firebase";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function EmployeePopup({
  closePopup,
  onSuccess,
  employeeToEdit,
  setEmployeeToEdit,
  setFlash,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: employeeToEdit?.fname || "test",
      lname: employeeToEdit?.lname || "test",
      email: employeeToEdit?.email || "test@email.com",
      mobile: employeeToEdit?.mobile || "0000000000",
      password: employeeToEdit?.password || "password",
      confirmPassword: employeeToEdit?.confirmPassword || "password",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      reset();
      setEmployeeToEdit(null);
    };
  }, []);

  async function handleEmployeeCreation(data) {
    setIsLoading(true);
    const { fname, lname, email, mobile, password } = data;
    try {
      if (!employeeToEdit) {
        const { user } = await createUserWithEmailAndPassword(
          detatchAuth,
          email,
          password
        );
        await createUserProfile(user, {
          fname,
          lname,
          mobile,
          usertype: "EMPLOYEE",
        });
        await onSuccess();
        setFlash({ message: "Employee Created Successfully", type: "success" });
      } else {
        const docRef = await updateUserDetails(employeeToEdit, {
          fname,
          lname,
          mobile,
        });
        console.log({ docRef });
        await onSuccess();
        setFlash({ message: "Employee Details Updated", type: "success" });
      }
      closePopup();
      reset();
    } catch (err) {
      setFlash({ message: err.message, type: "error" });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleEmployeeCreation)} noValidate>
      <Popup
        isLoading={isLoading}
        title="Create New Employee"
        closePopup={closePopup}
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
        {!employeeToEdit && (
          <>
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
          </>
        )}
      </Popup>
    </form>
  );
}

export default connect(null, { setFlash })(EmployeePopup);
