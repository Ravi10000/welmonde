import styles from "./all-admins.module.scss";
import Button from "../../components/button/button";
import { useState, useEffect } from "react";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { fetchAllAdmins } from "../../firebase/admin";
import AdminRecord from "./admin-record/admin-record";
import AdminPopup from "./admin-popup";
import { fetchMyAgreements } from "../../firebase/employee";
import DataCardList from "../../components/data-card-list/data-card-list";
import DataCard from "../../components/data-card/data-card";

function AllAdminsPage({ setFlash }) {
  const [showPopup, setShowPopup] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminToEdit, setAdminToEdit] = useState(null);

  const [totalAgreementsVerified, setTotalAgreementsVerified] = useState(0);
  const [totalAgreementsGenerated, setTotalAgreementsGenerated] = useState(0);

  const [totalContractsVerified, setTotalContractsVerified] = useState(0);
  const [totalContractsGenerated, setTotalContractsGenerated] = useState(0);

  console.log({ admins });
  useEffect(() => {
    let agVerified = 0;
    let agGenerated = 0;

    let contractsVerified = 0;
    let contractsGenerated = 0;

    admins?.forEach((admin) => {
      agGenerated += admin?.agreementsGenerated;
      agVerified += admin?.agreementsVerified;
      contractsGenerated += admin?.contractsGenerated;
      contractsVerified += admin?.contractsVerified;
    });
    setTotalAgreementsGenerated(agGenerated);
    setTotalAgreementsVerified(agVerified);
    setTotalContractsGenerated(contractsGenerated);
    setTotalContractsVerified(contractsVerified);
  }, [admins]);

  async function handleFetchAdmins() {
    let admins = await fetchAllAdmins();
    const updatedAdmins = await Promise.all(
      admins.map(async (admin) => {
        const res = await fetchMyAgreements(admin.uid);
        console.log({ res });
        let agVerified = 0;
        let agGenerated = 0;
        let contractsGenerated = 0;
        let contractsVerified = 0;
        res?.forEach((agreement) => {
          agGenerated++;
          contractsGenerated += agreement?.contracts?.length;
          if (agreement?.status === "OTP VERIFIED") {
            agVerified++;
            contractsVerified += agreement?.contracts?.length;
          }
          console.log(agreement?.status);
        });
        admin.agreementsVerified = agVerified;
        admin.agreementsGenerated = agGenerated;
        admin.contractsGenerated = contractsGenerated;
        admin.contractsVerified = contractsVerified;
        return admin;
      })
    );
    console.log({ updatedAdmins });
    setAdmins(updatedAdmins);
  }

  useEffect(() => {
    handleFetchAdmins();
  }, []);

  return (
    <div className={styles.allAdmins}>
      {showPopup && (
        <AdminPopup
          setAdminToEdit={setAdminToEdit}
          adminToEdit={adminToEdit}
          onSuccess={handleFetchAdmins}
          closePopup={() => {
            setShowPopup(false);
          }}
        />
      )}
      <DataCardList>
        <DataCard
          data={admins?.length}
          title="No. of Admins"
          icon="/card-icons/user (1).png"
        />
        <DataCard
          data={totalAgreementsGenerated}
          title="Agreements Generated"
          icon="/card-icons/copy.png"
        />
        <DataCard
          data={totalAgreementsVerified}
          title="Agreements Verified"
          icon="/card-icons/verify.png"
        />
        <DataCard
          data={totalContractsGenerated}
          title="Contracts Generated"
          icon="/card-icons/copy.png"
        />
        <DataCard
          data={totalContractsVerified}
          title="Contracts Verified"
          icon="/card-icons/verify.png"
        />
      </DataCardList>
      <div className={styles.head}>
        <h1 className="__pageHeading __subColorHeading">All Admins</h1>
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
            <th>Admin Name</th>
            <th>Admin Email</th>
            <th>Admin Phone</th>
            <th>Agreements Generated</th>
            <th>Agreements Signed</th>
            <th>Contracts Signed</th>
            {/* <th>Contracts Generated</th> */}
            <th>Actions</th>
          </thead>
          <tbody>
            {admins?.map((admin, i) => (
              <AdminRecord
                handleFetchAdmins={handleFetchAdmins}
                admin={admin}
                key={i}
                setAdminToEdit={setAdminToEdit}
                openPopup={() => setShowPopup(true)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(AllAdminsPage);
