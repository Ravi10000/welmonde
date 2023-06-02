import styles from "./my-agreements.module.scss";
import { useEffect, useState } from "react";
import { fetchMyAgreements } from "../../firebase/employee";
import { connect } from "react-redux";

import Button from "../../components/button/button";
import AgreementRecord from "./agreement-record/agreement-record";
import AddAgreementsPopup from "../../components/add-agreements-popup/add-agreements-popup";
import ViewAgreementPopup from "./view-agreement-popup/view-agreement-popup";
import OtpPopup from "../../components/otp-popup/otp-popup";
import DataCardList from "../../components/data-card-list/data-card-list";
import DataCard from "../../components/data-card/data-card";
import jsonToExcel from "../../utils/jsonToExcel";
import { fetchVerifiedAgreements } from "../../firebase/agreement";
import { fetchClienDetails } from "../../firebase/auth";
import { setFlash } from "../../redux/flash/flash.actions";

function MyAgreementsPage({ currentUser, adminPrivilages, setFlash }) {
  const [agreements, setAgreements] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);
  const [viewAgreement, setViewAgreement] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [agreementToEdit, setAgreementToEdit] = useState(null);
  const [updateAgreement, setUpdateAgreement] = useState(false);
  const [printing, setPrinting] = useState(false);

  console.log({ updateAgreement });

  let noOfVerifed = 0;
  let noOfDenied = 0;
  let noOfFollowedUp = 0;
  let noOfSent = 0;

  agreements?.forEach((agreement) => {
    if (agreement?.status === "OTP VERIFIED") {
      noOfVerifed++;
    } else if (agreement?.status === "DENIED") {
      noOfDenied++;
    } else if (agreement?.status === "FOLLOWED UP") {
      noOfFollowedUp++;
    } else if (agreement?.status === "SENT TO CLIENT") {
      noOfSent++;
    }
  });
  async function handleFetchAgreements() {
    try {
      const agreements = await fetchMyAgreements(
        adminPrivilages ? null : currentUser.uid
      );
      // console.log(agreements);
      setAgreements(agreements);
    } catch (err) {
      console.log(err);
    }
  }

  function openVerificationPopup(agreement) {
    setAgreementToEdit(agreement);
    setShowOtpPopup(true);
  }

  async function handleJsonToExcel() {
    setPrinting(true);
    try {
      const verifiedAgreements = await fetchVerifiedAgreements();

      const clientsResponse = verifiedAgreements.map(async (agreement) => {
        return new Promise(async (resolve, reject) => {
          try {
            let client = await fetchClienDetails(agreement.clientId);
            resolve(client);
          } catch (err) {
            reject(err);
          }
        });
      });
      Promise.all(clientsResponse).then(async (clients) => {
        console.log({ clients });
        let data = [];
        verifiedAgreements.forEach((agreement, index) => {
          let {
            id: agreementId,
            clientId,
            verificationOtp,
            contracts,
            employeeId,
            createdAt: agreementCreatedAt,
            updatedAt: agreementUpdatedAt,
            ...agreementDataToPush
          } = agreement;
          let clientDataToPush = {};
          for (let i = 0; i < clients.length; i++) {
            if (clients[i].id === clientId) {
              var { fname, lname, mobile, email } = clients[i];
              clientDataToPush = {
                clientName: `${fname} ${lname}`,
                clientMobile: mobile,
                clientEmail: email,
              };
              break;
            }
          }
          data[index] = {
            ...agreementDataToPush,
            contracts: contracts.join(", "),
            ...clientDataToPush,
          };
        });
        console.log({ data });
        await jsonToExcel(data);
        setPrinting(false);
        setFlash({
          message: "Excel report downloaded successfully",
          type: "success",
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchAgreements();
  }, []);

  return (
    <div className={styles.myAgreementsPage}>
      {viewAgreement && (
        <ViewAgreementPopup
          agreement={viewAgreement}
          closeAgreement={() => setViewAgreement(null)}
        />
      )}
      {showOtpPopup && (
        <OtpPopup
          onSuccess={handleFetchAgreements}
          setShowOtpPopup={setShowOtpPopup}
          agreement={agreementToEdit}
        />
      )}
      {showPopup && (
        <AddAgreementsPopup
          agreementToUpdate={updateAgreement}
          setAgreementToUpdate={setUpdateAgreement}
          adminPrivilages={adminPrivilages}
          closePopup={closePopup}
          onSuccess={handleFetchAgreements}
        />
      )}
      <main className={styles.pageContent}>
        <DataCardList>
          <DataCard
            data={agreements?.length}
            title="No. of Agreements"
            icon="/card-icons/document.png"
          />
          <DataCard
            data={noOfVerifed}
            title="Agreements Verified"
            icon="/card-icons/file.png"
          />
          <DataCard
            data={noOfSent}
            title="Agreements Sent to Client"
            icon="/card-icons/send.png"
          />
          <DataCard
            data={noOfFollowedUp}
            title="Agreements Followed Up"
            icon="/card-icons/followers.png"
          />
          <DataCard
            data={noOfDenied}
            title="Agreements Denied"
            icon="/card-icons/denied.png"
          />
        </DataCardList>
        <div className={styles.head}>
          <h1 className="__pageHeading __subColorHeading">
            {adminPrivilages ? "All" : "My"} Agreements
          </h1>
          <div className={styles.btnContainer}>
            <Button
              outlined
              isLoading={printing}
              fit
              icon="/pdf-download.png"
              hoverIcon="/pdf-download-hovered.png"
              onClick={handleJsonToExcel}
            >
              Download Excel File
            </Button>
            <Button outlined fit onClick={openPopup}>
              Add New Agreement
            </Button>
          </div>
        </div>
        <div className="__tableContainer">
          <table>
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Client Name</th>
                <th>Representative Name</th>
                {/* <th>Client Address</th> */}
                {/* <th>Mobile</th> */}
                {/* <th>Contracts</th> */}
                {/* <th>Added On</th> */}
                <th>Status</th>
                <th>Options</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((agreement, i) => (
                <AgreementRecord
                  triggerUpdateAgreement={() => {
                    setUpdateAgreement(agreement);
                    setShowPopup(true);
                  }}
                  openVerificationPopup={openVerificationPopup}
                  setShowOtpPopup={setShowOtpPopup}
                  openAgreement={() => {
                    setViewAgreement(agreement);
                  }}
                  onSuccess={handleFetchAgreements}
                  key={agreement?.id}
                  agreement={agreement}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState, { setFlash })(MyAgreementsPage);
