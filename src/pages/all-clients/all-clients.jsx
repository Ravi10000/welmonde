import styles from "./all-clients.module.scss";
import Button from "../../components/button/button";
import { useState } from "react";
import Popup from "../../components/popup/popup";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";

function AllClientsPage() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className={styles.allClients}>
      {showPopup && (
        <Popup title="Client Details" closePopup={() => setShowPopup(false)}>
          <TextInput name="name" label="Name" placeholder="Enter Client Name" />
          <TextInput
            name="email"
            label="Email"
            placeholder="Enter Client Email Id"
          />
          <NumInput
            maxLength={10}
            name="phone"
            label="Phone"
            placeholder="Enter Client Phone Number"
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Enter Client Password"
          />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter Same Password As Above"
          />
        </Popup>
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
              <th>
                <input type="checkbox" />
              </th>
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
                Total Contracts Generated
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Signed
                <img src="/sorting.png" alt="sort" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(100)
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Ravi Sharma</td>
                  <td>Toduest Enterprises</td>
                  <td>ravisince2k@gmail.com</td>
                  <td>9560863067</td>
                  <td>102</td>
                  <td>40</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllClientsPage;
