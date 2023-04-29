import styles from "./all-clients.module.scss";
import Button from "../../components/button/button";
import { useState } from "react";
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { useEffect } from "react";
import {
  updateClientDetails,
  addNewClient,
  fetchAllClients,
} from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import CheckBox from "../../components/check-box/check-box";

function AllClientsPage({ setFlash }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [userId, setUserId] = useState(null);

  const [clients, setClients] = useState([]);

  async function handleFetchClients() {
    const clients = await fetchAllClients();
    setClients(clients);
  }
  async function handleClientCreation(data) {
    setIsAddingUser(true);
    try {
      const userSnapshot = await addNewClient(data);
      console.log({ userSnapshot: userSnapshot?.id });
      if (userSnapshot) {
        reset();
        setUserId(userSnapshot?.id);
        setShowDetailsPopup(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsAddingUser(false);
      setShowInitialPopup(false);
    }
  }

  async function handleClientDetailsUpdate(data) {
    setIsUpdatingUser(true);
    try {
      const res = await updateClientDetails(userId, data);
      console.log({ res });
      await handleFetchClients();
      setFlash({
        message: "Client Details Updated Successfully",
        type: "success",
      });
      setShowDetailsPopup(false);
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdatingUser(false);
      setShowDetailsPopup(false);
    }
  }

  useEffect(() => {
    handleFetchClients();
  }, []);

  return (
    <div className={styles.allClients}>
      {showInitialPopup && (
        <form onSubmit={handleSubmit(handleClientCreation)} noValidate>
          <Popup
            isLoading={isAddingUser}
            title={`Create New Client`}
            closePopup={() => setShowInitialPopup(false)}
          >
            <TextInput
              label="First Name"
              placeholder="Enter First Name"
              error={errors?.fname?.message}
              defaultValue={"test"}
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
              defaultValue={"test"}
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
            <TextInput
              defaultValue={"test@mail.com"}
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
              defaultValue={"909090123123"}
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
          </Popup>
        </form>
      )}
      {showDetailsPopup && (
        <form onSubmit={handleSubmit(handleClientDetailsUpdate)}>
          <Popup
            defaultValue={"test"}
            isLoading={isUpdatingUser}
            title="Client Details"
            closePopup={() => setShowDetailsPopup(false)}
          >
            <TextInput
              defaultValue={"test"}
              name="representativeName"
              label="Representative Name"
              placeholder="Enter Representative Name"
              required={true}
              register={register("representativeName", { required: true })}
            />
            <TextInput
              defaultValue={"test"}
              name="businessName"
              label="Business Name"
              placeholder="Enter Business Name"
              required={true}
              register={register("businessName", { required: true })}
            />
            <TextInput
              defaultValue={"test"}
              name="street"
              label="Street"
              placeholder="Enter Street"
              register={register("street", { required: true })}
            />
            <TextInput
              defaultValue={"test"}
              name="city"
              label="City"
              placeholder="Enter City"
              required={true}
              register={register("city", { required: true })}
            />
            <TextInput
              defaultValue={"test"}
              name="state"
              label="State"
              placeholder="Enter State"
              required={true}
              register={register("state", { required: true })}
            />
            <NumInput
              defaultValue={"909090"}
              maxLength={6}
              name="pincode"
              label="Pincode"
              placeholder="Enter Pincode"
              required={true}
              register={register("pincode", { required: true })}
            />
            <div className={styles.vertical}>
              <p>Vertical</p>
              <div className={styles.list}>
                <CheckBox
                  label="Clinic"
                  name="vertical"
                  {...register("vertical")}
                />
                <CheckBox
                  label="Pharmacy"
                  register={{ ...register("vertical") }}
                />
                <CheckBox
                  label="Diagnostics"
                  register={{ ...register("vertical") }}
                />
                <CheckBox
                  label="Pet Clinic"
                  register={{ ...register("vertical") }}
                />
                <CheckBox
                  label="Ayurveda"
                  register={{ ...register("vertical") }}
                />
                <CheckBox
                  label="Fitness"
                  register={{ ...register("vertical") }}
                />
                <CheckBox
                  label="Wellness"
                  register={{ ...register("vertical") }}
                />
              </div>
            </div>
          </Popup>
        </form>
      )}
      <h1 className="__pageHeading __subColorHeading">All Clients</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>{clients?.length}</p>
            <h4>Total Clients</h4>
          </div>
          <div className={styles.card}>
            <p>1200</p>
            <h4>Contracts Signed</h4>
          </div>
          <div className={styles.card}>
            <p>120</p>
            <h4>OTP Verified</h4>
          </div>
        </section>
        <Button
          outlined
          fit
          icon={"/add-user.png"}
          hoverIcon={"/add-user-hover.png"}
          onClick={() => setShowInitialPopup(true)}
        >
          <p>Add Client</p>
        </Button>
      </div>
      <div className="__tableContainer">
        <table>
          <thead>
            <tr>
              {/* <th>
                <input type="checkbox" />
              </th> */}
              <th>
                Client Name
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Business Name
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Client Email
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Client Phone
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Address
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Vertical
                <img src="/sorting.png" alt="sort" />
              </th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client, i) => (
              <tr key={i}>
                {/* <td>
                  <input type="checkbox" />
                </td> */}
                <td>{client?.representativeName}</td>
                <td>{client?.businessName}</td>
                <td>ravisince2k@gmail.com</td>
                <td>{client?.mobile}</td>
                <td>
                  {client?.street}, {client?.city}, {client?.state},{" "}
                  {client?.pincode}
                </td>
                <td className={styles.verticalData}>
                  {client?.vertical &&
                    client?.vertical?.map((v) => <p>{v}, </p>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AllClientsPage);
