import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { useForm } from "react-hook-form";
import {
  createUserProfile,
  fetchUserByEmail,
  fetchUserByPhone,
  updateUserDetails,
} from "../../firebase/auth";
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
      fname: employeeToEdit?.fname || "",
      lname: employeeToEdit?.lname || "",
      email: employeeToEdit?.email || "",
      mobile: employeeToEdit?.mobile || "",
      password: employeeToEdit?.password || "",
      confirmPassword: employeeToEdit?.confirmPassword || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  console.log({ employeeToEdit });
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
        let existingEmployee = await fetchUserByEmail(email);
        if (existingEmployee.length > 0)
          return setFlash({
            message: "Employee with this email address already exists.",
            type: "error",
          });
        existingEmployee = await fetchUserByPhone(mobile);
        if (existingEmployee.length > 0)
          return setFlash({
            message: "Employee with this moblie number already exists.",
            type: "error",
          });
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
    } catch (err) {
      setFlash({ message: err.message, type: "error" });
      console.log(err);
    } finally {
      closePopup();
      reset();
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleEmployeeCreation)} noValidate>
      <Popup
        isLoading={isLoading}
        title={employeeToEdit ? "Edit Employee Details" : "Create New Employee"}
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
          maxLength={16}
          label="Mobile Number"
          placeholder="Enter Employee Mobile Number"
          error={errors?.mobile?.message}
          register={{
            ...register("mobile", {
              required: "Enter Mobile Number",
            }),
          }}
        />
        {!employeeToEdit && (
          <>
            <TextInput
              label="Email"
              placeholder="Enter Employee Email Id"
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
              placeholder="Enter Employee Password"
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
