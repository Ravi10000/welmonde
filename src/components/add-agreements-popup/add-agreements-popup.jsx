import styles from "./add-agreements-popup.module.scss";
import Popup from "../popup/popup";
import TextInput from "../text-input/text-input";
import { verticals } from "../../data/verticals";
import CheckBox from "../check-box/check-box";
import CustomSelect from "../custom-select/custom-select";
import { useEffect, useState } from "react";
// import { fetchAllClients } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { setFlash } from "../../redux/flash/flash.actions";
import {
  addAgreement,
  fetchMyClients,
  upateAgreementDetails,
} from "../../firebase/employee";
import NumInput from "../num-input/num-input";

function AddAgreementsPopup({
  closePopup,
  onSuccess,
  currentUser,
  setFlash,
  adminPrivilages,
  agreementToUpdate,
  setAgreementToUpdate,
}) {
  const [selectedClient, setSelectedClient] = useState(
    agreementToUpdate || null
  );
  console.log({ selectedClient });
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingClients, setFetchingClients] = useState(false);

  console.log({ selectedClient });

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  async function handleFetchClients() {
    setFetchingClients(true);
    const clients = await fetchMyClients(
      adminPrivilages ? null : currentUser?.uid
    );
    console.log({ clients });
    setClientList(clients);
    setFetchingClients(false);
  }

  async function handleAddAgreement(data) {
    setIsLoading(true);
    data.status = "ADDED";
    data.createdAt = new Date().toISOString();
    data.clientId = selectedClient.id;
    data.employeeId = currentUser?.uid;
    data.verificationOtp = Math.floor(1000 + Math.random() * 9000);

    console.log(data);
    try {
      const docRef = await addAgreement(data);
      if (docRef) {
        await onSuccess();
        setFlash({
          type: "success",
          message: "Agreement Added Successfully",
        });
        return reset();
      }
      setFlash({
        type: "error",
        message: "Something went wrong",
      });
    } catch (err) {
      console.log(err);
    } finally {
      closePopup();
      setIsLoading(false);
    }
  }
  async function handleUpdateAgreementDetails(data) {
    setIsLoading(true);
    console.log("updating agreement details");
    data.updatedBy = currentUser?.uid;
    // data.employeeId = currentUser?.uid;
    // data.verificationOtp = Math.floor(1000 + Math.random() * 9000);

    console.log(data);
    try {
      const res = await upateAgreementDetails(agreementToUpdate.id, data);
      if (res.status === "success") {
        await onSuccess();
        setFlash({
          type: "success",
          message: "Agreement Updated Successfully",
        });
        return reset();
      }
      setFlash({
        type: "error",
        message: "Something went wrong",
      });
    } catch (err) {
      console.log(err);
    } finally {
      closePopup();
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFetchClients();
    return () => {
      setAgreementToUpdate(null);
      setSelectedClient(null);
      reset();
    };
  }, []);

  useEffect(() => {
    if (!selectedClient) return;
    setValue("businessName", selectedClient?.businessName);
    setValue("representativeName", selectedClient?.representativeName);

    if (selectedClient?.clientId) {
      setValue("clientName", selectedClient?.clientName);
      setValue("clientAddress", selectedClient?.clientAddress);
      // setValue("contracts", selectedClient?.contracts);
    } else {
      // setValue("contracts", selectedClient?.vertical);
      setValue(
        "clientName",
        selectedClient?.fname + " " + selectedClient?.lname
      );
      setValue(
        "clientAddress",
        selectedClient &&
          selectedClient?.street +
            ", " +
            selectedClient?.city +
            ", " +
            selectedClient?.state +
            ", " +
            selectedClient?.pincode
      );
    }
  }, [selectedClient]);
  return (
    <form
      className={styles.addAgreementPopup}
      onSubmit={handleSubmit(
        agreementToUpdate ? handleUpdateAgreementDetails : handleAddAgreement
      )}
      noValidate
    >
      <Popup
        closePopup={closePopup}
        title={agreementToUpdate ? "Update Agreement" : "Add Agreement"}
        isLoading={isLoading}
      >
        {fetchingClients ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            <CustomSelect
              label="Select Client"
              setSelectedOption={setSelectedClient}
              selectedOption={selectedClient}
              options={clientList}
            />
            <TextInput
              label="Business Name"
              error={errors?.businessName?.message}
              register={{
                ...register("businessName", { required: "Required" }),
              }}
            />
            <TextInput
              label="Client Name"
              error={errors?.clientName?.message}
              register={{ ...register("clientName", { required: "Required" }) }}
            />
            <TextInput
              label="Represntative Name"
              error={errors?.representativeName?.message}
              register={{
                ...register("representativeName", { required: "Required" }),
              }}
            />
            <TextInput
              label="Address"
              error={errors?.clientAddress?.message}
              register={{
                ...register("clientAddress", {
                  required: "Client Address Required",
                }),
              }}
            />
            {/* <TextInput
          label="Email"
          register={{
            ...register("email", {
              required: "Email ID Required",
            }),
          }}
        />
        <NumInput
          label="Mobile"
          maxLength={10}
          register={{
            ...register("mobile", {
              required: "Mobile Number Required",
            }),
          }}
        /> */}
            <p className={styles.label}>Contracts</p>
            <div className={styles.verticalsSelect}>
              {verticals?.map((vertical) => {
                return (
                  <CheckBox
                    defaultChecked={agreementToUpdate?.contracts?.includes(
                      vertical
                    )}
                    label={vertical}
                    key={vertical}
                    register={{
                      ...register("contracts", {
                        required: "select atleast one contract",
                      }),
                    }}
                  />
                );
              })}
              {errors?.contracts?.message && (
                <p className={styles.errMsg}>{errors?.contracts?.message}</p>
              )}
            </div>
          </>
        )}
      </Popup>
    </form>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState, { setFlash })(AddAgreementsPopup);
