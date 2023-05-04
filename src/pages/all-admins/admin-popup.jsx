import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { useForm } from "react-hook-form";
import { createUserProfile, fetchAllAdmins } from "../../firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setFlash } from "../../redux/flash/flash.actions";
import { detatchAuth } from "../../firebase";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserDetails } from "../../firebase/auth";

function AdminPopup({
  closePopup,
  onSuccess,
  adminToEdit,
  setAdminToEdit,
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
      fname: adminToEdit?.fname || "test",
      lname: adminToEdit?.lname || "test",
      email: adminToEdit?.email || "test@email.com",
      mobile: adminToEdit?.mobile || "0000000000",
      password: adminToEdit ? "" : "password",
      confirmPassword: adminToEdit ? "" : "password",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    return () => {
      reset();
      setAdminToEdit(null);
    };
  }, []);

  async function handleAdminCreation(data) {
    setIsLoading(true);
    const { fname, lname, email, mobile, password } = data;
    try {
      if (!adminToEdit) {
        const { user } = await createUserWithEmailAndPassword(
          detatchAuth,
          email,
          password
        );
        await createUserProfile(user, {
          fname,
          lname,
          mobile,
          usertype: "ADMIN",
        });
        await onSuccess();
        setFlash({
          message: "Admin Created Successfully",
          type: "success",
        });
      } else {
        const docRef = await updateUserDetails(adminToEdit, {
          fname,
          lname,
          mobile,
        });
        if (docRef?.error) {
          setFlash({ message: docRef.error, type: "error" });
        }
        await onSuccess();
        setFlash({
          type: "success",
          message: "Admin Details Updated",
        });
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
    <form onSubmit={handleSubmit(handleAdminCreation)} noValidate>
      <Popup
        isLoading={isLoading}
        title="Create New Admin"
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
        {!adminToEdit && (
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

export default connect(null, { setFlash })(AdminPopup);
