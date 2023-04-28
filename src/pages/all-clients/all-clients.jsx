import styles from "./all-clients.module.scss";
import Button from "../../components/button/button";
import { useState } from "react";
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
import { useEffect } from "react";
import { addClient, fetchAllClients } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function AllClientsPage({ setFlash }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      representativeName: "test",
      businessName: "test business",
      mobile: Math.floor(Math.random() * 1000000000),
      street: "street",
      city: "city",
      state: "state",
      pincode: "000000",
    },
  });

  const [showPopup, setShowPopup] = useState(false);
  const [clients, setClients] = useState([]);

  async function handleFetchClient() {
    const clients = await fetchAllClients();
    setClients(clients);
  }
  async function handleClientCreation(data) {
    const res = await addClient(data);
    await handleFetchClient();
    setShowPopup(false);
    reset();
  }

  useEffect(() => {
    handleFetchClient();
  }, []);

  return (
    <div className={styles.allClients}>
      {showPopup && (
        <form onSubmit={handleSubmit(handleClientCreation)}>
          <Popup title="Client Details" closePopup={() => setShowPopup(false)}>
            <TextInput
              name="representativeName"
              label="Representative Name"
              placeholder="Enter Representative Name"
              required={true}
              register={register("representativeName", { required: true })}
            />
            <TextInput
              name="businessName"
              label="Business Name"
              placeholder="Enter Business Name"
              required={true}
              register={register("businessName", { required: true })}
            />
            <NumInput
              maxLength={10}
              name="mobile"
              label="Phone"
              placeholder="Enter Client Phone Number"
              required={true}
              register={register("mobile", { required: true })}
            />
            <TextInput
              name="street"
              label="Street"
              placeholder="Enter Street"
              register={register("street", { required: true })}
            />
            <TextInput
              name="city"
              label="City"
              placeholder="Enter City"
              required={true}
              register={register("city", { required: true })}
            />
            <TextInput
              name="state"
              label="State"
              placeholder="Enter State"
              required={true}
              register={register("state", { required: true })}
            />
            <NumInput
              maxLength={6}
              name="pincode"
              label="Pincode"
              placeholder="Enter Pincode"
              required={true}
              register={register("pincode", { required: true })}
            />
          </Popup>
        </form>
      )}
      <h1 className="__pageHeading __subColorHeading">All Clients</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>12000</p>
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
          onClick={() => setShowPopup(true)}
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
                <td>
                  {client?.vertical?.map((v) => (
                    <p>{v}, </p>
                  ))}
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
