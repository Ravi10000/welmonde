import styles from "./my-clients.module.scss";
import { useState, useEffect } from "react";

import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import {
  updateClientDetails,
  addNewClient,
  EditClientDetails,
  // fetchUser,
  // fetchUserByPhone,
  // fetchUserByEmail,
  fetchClientByPhone,
  fetchClientByEmail,
} from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import CheckBox from "../../components/check-box/check-box";
import ClientRecord from "./client-record/client-record";
import { verticals } from "../../data/verticals";
import { fetchMyClients } from "../../firebase/employee";
import {
  fetchAgreementsByClientId,
  fetchAgreementsByPhone,
} from "../../firebase/agreement";
import DataCardList from "../../components/data-card-list/data-card-list";
import DataCard from "../../components/data-card/data-card";
import PhoneInput from "react-phone-number-input";

function MyClientsPage({ setFlash, currentUser, adminPrivilages }) {
  const [clients, setClients] = useState([]);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [phone, setPhone] = useState("");
  console.log({ clientToEdit });
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [agreementsGenerated, setAgreementsGenerated] = useState(0);
  const [agreementVerified, setAgreementsVerified] = useState(0);
  const [contractsGenerated, setContractsGenerated] = useState(0);
  const [contractsVerified, setContractsVerified] = useState(0);

  function closeInitialPopup() {
    setShowInitialPopup(false);
    resetField("fname");
    resetField("lname");
    resetField("email");
    resetField("mobile");
    setPhone("");
  }

  async function handleFetchClients() {
    console.log({ uid: currentUser?.uid });
    const clients = await fetchMyClients(
      adminPrivilages ? null : currentUser?.uid
    );

    const updatedClients = await Promise.all(
      clients.map(async (client) => {
        const res = await fetchAgreementsByClientId(client.id);
        let aggVerified = 0;
        let aggGenerated = 0;
        let contractsCount = 0;
        let contractsVerified = 0;
        res?.forEach((agreement) => {
          aggGenerated++;
          contractsCount += agreement?.contracts?.length;
          if (agreement?.status === "OTP VERIFIED") {
            aggVerified++;
            contractsVerified += agreement?.contracts?.length;
          }
        });
        client.agreementsGenerated = aggGenerated;
        client.agreementsVerified = aggVerified;

        client.contractsVerified = contractsVerified;
        client.contractsCount = contractsCount;
        return client;
      })
    );
    console.log({ updatedClients });
    setClients(updatedClients);
  }
  async function handleClientCreation(data) {
    data.mobile = phone;
    setIsAddingUser(true);
    try {
      if (!clientToEdit) {
        data.createdBy = currentUser?.uid;
        let existingClient = await fetchClientByPhone(data.mobile);
        console.log({ existingClient });

        if (existingClient.length > 0)
          return setFlash({
            message: "Client already exists with that mobile number.",
            type: "error",
          });

        if (data.email) existingClient = await fetchClientByEmail(data.email);
        console.log({ existingClient });
        if (existingClient.length > 0)
          return setFlash({
            message: "Client already exists with that email address.",
            type: "error",
          });

        const userSnapshot = await addNewClient(data);
        if (userSnapshot?.error) {
          return setFlash({
            message: userSnapshot?.error,
            type: "error",
          });
        }
        if (userSnapshot.id) {
          reset();
          setUserId(userSnapshot?.id);
          setShowDetailsPopup(true);
        }
      } else {
        const docRef = await EditClientDetails(clientToEdit, {
          fname: data.fname || clientToEdit.fname,
          lname: data.lname || clientToEdit.lname,
          email: data.email || clientToEdit.email,
        });
        setShowInitialPopup(false);
        setShowDetailsPopup(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAddingUser(false);
      closeInitialPopup();
    }
  }

  async function handleClientDetailsUpdate(data) {
    setIsUpdatingUser(true);
    console.log({ data, clientToEdit });
    try {
      if (!clientToEdit) {
        const snapshot = await updateClientDetails(userId, data);
        await handleFetchClients();
        setFlash({
          message: "Client Details Updated Successfully",
          type: "success",
        });
        setShowDetailsPopup(false);
        reset();
      } else {
        const docRef = await EditClientDetails(clientToEdit, {
          representativeName:
            data.representativeName || clientToEdit.representativeName,
          businessName: data.businessName || clientToEdit.businessName,
          street: data.street || clientToEdit.street,
          city: data.city || clientToEdit.city,
          state: data.state || clientToEdit.state,
          pincode: data.pincode || clientToEdit.pincode,
          vertical: data.vertical || clientToEdit.vertical,
        });
        await handleFetchClients();
        setFlash({
          message: "Client Details Updated Successfully",
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      reset();
      setClientToEdit(null);
      setIsUpdatingUser(false);
      setShowDetailsPopup(false);
    }
  }

  useEffect(() => {
    handleFetchClients();
  }, []);

  useEffect(() => {
    let aggVerified = 0;
    let aggGenerated = 0;
    let totalContracts = 0;
    let contractsVerified = 0;
    clients?.forEach((client) => {
      aggGenerated += client?.agreementsGenerated;
      aggVerified += client?.agreementsVerified;
      totalContracts += client?.contractsCount;
      contractsVerified += client?.contractsVerified;
    });
    setAgreementsGenerated(aggGenerated);
    setAgreementsVerified(aggVerified);
    setContractsGenerated(totalContracts);
    setContractsVerified(contractsVerified);
  }, [clients]);

  return (
    <div className={styles.allClients}>
      {showInitialPopup && (
        <form onSubmit={handleSubmit(handleClientCreation)} noValidate>
          <Popup
            isLoading={isAddingUser}
            title={clientToEdit ? "Edit Client Details" : "Create New Client"}
            closePopup={closeInitialPopup}
          >
            <TextInput
              label="First Name"
              placeholder="Enter First Name"
              error={errors?.fname?.message}
              defaultValue={clientToEdit?.fname || ""}
              register={{
                ...register("fname", {
                  required: "Enter First Name",
                }),
              }}
            />
            <TextInput
              defaultValue={clientToEdit?.lname || ""}
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
              defaultValue={clientToEdit?.email || ""}
              label="Email"
              placeholder="Enter Client Email Id"
              error={errors?.email?.message}
              register={{
                ...register("email", {
                  // required: "Enter Email Id",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Not a valid Email Id",
                  },
                }),
              }}
            />
            {!clientToEdit && (
              <>
                <label className={styles.label}>Mobile Number</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                />
              </>
              // <NumInput
              //   defaultValue={clientToEdit?.mobile || ""}
              //   maxLength={16}
              //   label="Mobile Number(with country code)"
              //   placeholder="Enter Client Mobile Number"
              //   error={errors?.mobile?.message}
              //   register={{
              //     ...register("mobile", {
              //       required: "Enter Mobile Number",
              //     }),
              //   }}
              // />
            )}
          </Popup>
        </form>
      )}
      {showDetailsPopup && (
        <form onSubmit={handleSubmit(handleClientDetailsUpdate)}>
          <Popup
            isLoading={isUpdatingUser}
            title={clientToEdit ? "Edit Client Details" : "Client Details"}
            closePopup={() => {
              reset();
              // resetField("representativeName");
              // resetField("lname");
              // resetField("email");
              // resetField("mobile");
              setClientToEdit(null);
              setShowDetailsPopup(false);
            }}
          >
            <TextInput
              defaultValue={clientToEdit?.representativeName || ""}
              label="Representative Name"
              placeholder="Enter Representative Name"
              register={register("representativeName", { required: true })}
            />
            <TextInput
              defaultValue={clientToEdit?.businessName || ""}
              label="Business Name"
              placeholder="Enter Business Name"
              register={register("businessName", { required: true })}
            />
            <TextInput
              defaultValue={clientToEdit?.street || ""}
              label="Street"
              placeholder="Enter Street"
              register={register("street", { required: true })}
            />
            <TextInput
              defaultValue={clientToEdit?.city || ""}
              label="City"
              placeholder="Enter City"
              register={register("city", { required: true })}
            />
            <TextInput
              defaultValue={clientToEdit?.state || ""}
              label="State"
              placeholder="Enter State"
              register={register("state", { required: true })}
            />
            <NumInput
              defaultValue={clientToEdit?.pincode || ""}
              maxLength={6}
              label="Pincode"
              placeholder="Enter Pincode"
              register={register("pincode", { required: true })}
            />
            <div className={styles.vertical}>
              <p>Vertical</p>
              <div className={styles.list}>
                {verticals?.map((vertical) => {
                  return (
                    <CheckBox
                      defaultChecked={clientToEdit?.vertical?.includes(
                        vertical
                      )}
                      label={vertical}
                      key={vertical}
                      register={{
                        ...register("vertical", {
                          required: "select atleast one contract",
                        }),
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </Popup>
        </form>
      )}

      <DataCardList>
        <DataCard
          data={clients?.length}
          title="No. of Clients"
          icon="/card-icons/user (1).png"
        />
        <DataCard
          data={contractsGenerated}
          title="Contracts Generated"
          icon="/card-icons/copy.png"
        />
        <DataCard
          data={contractsVerified}
          title="Contracts Verified"
          icon="/card-icons/copy.png"
        />
        <DataCard
          data={agreementsGenerated}
          title="Agreements Generated"
          icon="/card-icons/copy.png"
        />
        <DataCard
          data={agreementVerified}
          title="Agreements Verified"
          icon="/card-icons/verify.png"
        />
      </DataCardList>
      <div className={styles.cardsAndBtn}>
        <h1 className="__pageHeading __subColorHeading">
          {adminPrivilages ? "All" : "My"} Clients
        </h1>
        <Button
          outlined
          fit
          icon={"/add-user.png"}
          hoverIcon={"/add-user-hover.png"}
          onClick={() => {
            setClientToEdit(null);
            setShowInitialPopup(true);
          }}
        >
          <p>Add Client</p>
        </Button>
      </div>
      <div className="__tableContainer">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Business</th>
              <th>Email</th>
              <th>Phone</th>
              {/* <th>Address</th> */}
              {/* <th>Vertical</th> */}
              <th>Agreements Generated</th>
              <th>Agreements Signed</th>
              <th>Contracts Signed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client, i) => (
              <ClientRecord
                client={client}
                key={i}
                handleFetchClients={handleFetchClients}
                setClientToEdit={setClientToEdit}
                openPopup={() => setShowInitialPopup(true)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState, { setFlash })(MyClientsPage);
