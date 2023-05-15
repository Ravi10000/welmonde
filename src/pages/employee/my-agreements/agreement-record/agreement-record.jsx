import { useEffect, useState } from "react";
import styles from "./agreement-record.module.scss";
import { useRef } from "react";
import {
  deleteAgreement,
  updateAgreementStatus,
} from "../../../../firebase/employee";
import { setFlash } from "../../../../redux/flash/flash.actions";
import { connect } from "react-redux";
import Button from "../../../../components/button/button";
import { fetchClienDetails } from "../../../../firebase/auth";
import {
  sendAgreementViaEmail,
  sendOtpViaEmail,
} from "../../../../firebase/mail";
import Actions from "../../../../components/actions/actions";

function AgreementRecord({
  agreement,
  onSuccess,
  openAgreement,
  setFlash,
  openVerificationPopup,
  triggerUpdateAgreement,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const optionsRef = useRef(null);

  const addedOnDate = new Date(agreement?.createdAt).toDateString();
  const addedOnTime = new Date(agreement?.createdAt).toLocaleTimeString();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  async function handleUpdateStatus(status, method) {
    setShowOptions(false);
    setIsloading(true);

    if (status === "SENT TO CLIENT" && method === "email") {
      const agreementLink = `${import.meta.env.VITE_SITE_URL}/contracts/${
        agreement?.id
      }`;
      const client = await fetchClienDetails(agreement?.clientId);
      await sendAgreementViaEmail(client?.email, agreementLink);
    }
    try {
      await updateAgreementStatus(agreement?.id, status);
      await onSuccess();
      if (status === "SENT TO CLIENT") {
        // const agreementLink = `${import.meta.env.VITE_SITE_URL}/contracts/${
        //   agreement?.id
        // }`;
        // console.log({ agreementLink });
        return setFlash({
          message: "Agreement sent to client successfully",
          type: "success",
        });
      }
      if (status === "FOLLOWED UP") {
        return setFlash({
          message: "Agreement status changed to followed up successfully",
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
      setFlash({
        message: err.message,
        type: "error",
      });
    } finally {
      setIsloading(false);
    }
  }
  async function handleDeleteAgreement() {
    setIsDeleting(true);
    const res = await deleteAgreement(agreement.id);
    if (res?.error)
      return setFlash({
        type: "error",
        message: "Something went wrong",
      });
    await onSuccess();
    setFlash({
      type: "success",
      message: "Agreement deleted successfully",
    });
    setIsDeleting(false);
  }

  return (
    <tr className={styles.agreementRecord} onClick={openAgreement}>
      <td>{agreement?.businessName}</td>
      <td>{agreement?.clientName}</td>
      <td>{agreement?.representativeName}</td>
      <td>{agreement?.clientAddress}</td>
      <td className={styles.contractNamesContainer}>
        {agreement?.contracts?.map((contract) => (
          <p key={contract} className={styles.contractName}>
            {contract}
          </p>
        ))}
      </td>
      <td>
        {addedOnDate}, {addedOnTime}
      </td>
      <td>{agreement?.status}</td>
      {agreement?.status === "FOLLOWED UP" ||
      agreement?.status === "OTP VERIFIED" ? (
        <td>N/A</td>
      ) : (
        ["ADDED", "SENT TO CLIENT", "DENIED"].includes(agreement?.status) && (
          <td
            className={styles.optionsContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className={styles.loader}></div>
            ) : (
              <div className={styles.optionsDiv}>
                <img
                  src="/3dots.png"
                  alt="options"
                  className={styles.optionsToggle}
                  onClick={() => setShowOptions(true)}
                />
              </div>
            )}
            {showOptions && (
              <nav className={styles.options} ref={optionsRef}>
                {["ADDED", "SENT TO CLIENT"].includes(agreement?.status) && (
                  <>
                    <li
                      onClick={() => {
                        if (isLoading) return;
                        handleUpdateStatus("SENT TO CLIENT", "email");
                      }}
                    >
                      <img src="/down.png" alt="" /> Send to client via email
                    </li>
                    <li
                      onClick={() => {
                        if (isLoading) return;
                        handleUpdateStatus("SENT TO CLIENT", "phone");
                      }}
                    >
                      <img src="/down.png" alt="" /> Send to client via phone
                    </li>
                    <li onClick={() => openVerificationPopup(agreement)}>
                      <img src="/down.png" alt="" />
                      verify with OTP
                    </li>
                  </>
                )}
                {agreement?.status === "DENIED" && (
                  <>
                    <li
                      onClick={() => {
                        if (isLoading) return;
                        handleUpdateStatus("FOLLOWED UP");
                      }}
                    >
                      <img src="/down.png" alt="" /> change status to followed
                      up
                    </li>
                  </>
                )}
              </nav>
            )}
          </td>
        )
      )}
      <td onClick={(e) => e.stopPropagation()}>
        {agreement?.status === "OTP VERIFIED" ? (
          <p>N/A</p>
        ) : (
          // <nav className={styles.actions}>
          //   {/* <Button action iconOnly onClick={() => triggerUpdateAgreement()}>
          //     <img src="/actions/edit-colored.png" alt="" />
          //   </Button> */}
          //   <span className={styles.edit}>
          //     <img
          //       onClick={() => triggerUpdateAgreement()}
          //       src="/actions/pencil.png"
          //       alt=""
          //     />
          //   </span>
          //   <span className={styles.edit}>
          //     <img
          //       src="/actions/delete-black.png"
          //       alt=""
          //       onClick={handleDeleteAgreement}
          //     />
          //   </span>
          //   {/* <Button
          //     isLoading={isDeleting}
          //     destruct
          //     iconOnly
          //     onClick={handleDeleteAgreement}
          //   >
          //     <img src="/actions/delete-colored.png" alt="" />
          //   </Button> */}
          // </nav>
          <Actions
            handleEdit={triggerUpdateAgreement}
            handleDelete={handleDeleteAgreement}
            isDeleting={isDeleting}
          />
        )}
      </td>
    </tr>
  );
}

export default connect(null, { setFlash })(AgreementRecord);
