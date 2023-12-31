import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { useForm } from "react-hook-form";
import {
  createUserProfile,
  fetchUserByEmail,
  fetchUserByPhone,
} from "../../firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setFlash } from "../../redux/flash/flash.actions";
import { detatchAuth } from "../../firebase";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserDetails } from "../../firebase/auth";
import PhoneInput from "react-phone-number-input";

function AdminPopup({
  closePopup,
  onSuccess,
  adminToEdit,
  setAdminToEdit,
  setFlash,
}) {
  const [mobile, setMobile] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: adminToEdit?.fname || "",
      lname: adminToEdit?.lname || "",
      email: adminToEdit?.email || "",
      // mobile: adminToEdit?.mobile || "",
      password: adminToEdit ? "" : "",
      confirmPassword: adminToEdit ? "" : "",
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
    const { fname, lname, email, password } = data;
    try {
      if (!adminToEdit) {
        let existingEmployee = await fetchUserByEmail(email);
        if (existingEmployee.length > 0)
          return setFlash({
            message: "Admin with this email address already exists.",
            type: "error",
          });
        existingEmployee = await fetchUserByPhone(mobile);
        if (existingEmployee.length > 0)
          return setFlash({
            message: "Admin with this moblie number already exists.",
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
        title={adminToEdit ? "Edit Admin Details" : "Create New Admin"}
        closePopup={closePopup}
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

        {/* <NumInput
          maxLength={16}
          label="Mobile Number"
          placeholder="Enter Admin Mobile Number"
          error={errors?.mobile?.message}
          register={{
            ...register("mobile", {
              required: "Enter Mobile Number",
            }),
          }}
        /> */}
        <label className="__phone-label">Mobile Number</label>
        <PhoneInput
          placeholder="Enter phone number"
          defaultCountry="IN"
          value={mobile}
          onChange={setMobile}
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
