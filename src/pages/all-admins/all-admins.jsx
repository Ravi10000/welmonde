import styles from "./all-admins.module.scss";
import Button from "../../components/button/button";
import Popup from "../../components/popup/popup";
import { useState } from "react";
import TextInput from "../../components/text-input/text-input";
import NumInput from "../../components/num-input/num-input";
function AllAdminsPage() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={styles.allAdmins}>
      {showPopup && (
        <Popup title="Create New Admin" closePopup={() => setShowPopup(false)}>
          <TextInput name="name" label="Name" placeholder="Enter Admin Name" />
          <TextInput
            name="email"
            label="Email"
            placeholder="Enter Admin Email Id"
          />
          <NumInput
            maxLength={10}
            name="phone"
            label="Phone"
            placeholder="Enter Admin Phone Number"
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Enter Admin Password"
          />
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter Same Password As Above"
          />
        </Popup>
      )}
      <h1 className="__pageHeading __subColorHeading">All Admins</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>12000</p>
            <h4>Total Admins</h4>
          </div>
          <div className={styles.card}>
            <p>1200</p>
            <h4>Contracts Generated</h4>
          </div>
          <div className={styles.card}>
            <p>120</p>
            <h4>Contracts Signed</h4>
          </div>
        </section>
        <Button
          outlined
          fit
          icon={"/add-user.png"}
          hoverIcon={"/add-user-hover.png"}
          onClick={() => setShowPopup(true)}
        >
          <p>Add Admin</p>
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
                Admin Name <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Admin Email
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Admin Phone <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Generated
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>Total Contracts Signed</th>
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
                  <td>ravisince2k@gmail.com</td>
                  <td>9560863067</td>
                  <td>102</td>
                  <td>102</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAdminsPage;
