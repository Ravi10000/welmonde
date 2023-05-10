import { useEffect, useState } from "react";
import styles from "./agreement-record.module.scss";
import { useRef } from "react";
import { updateAgreementStatus } from "../../../../firebase/employee";
import { setFlash } from "../../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function AgreementRecord({
  agreement,
  onSuccess,
  openAgreement,
  setFlash,
  openVerificationPopup,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsloading] = useState(false);

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

  async function handleUpdateStatus(status) {
    setShowOptions(false);
    setIsloading(true);
    try {
      const docRef = await updateAgreementStatus(agreement?.id, status);
      await onSuccess();
      if (status === "SENT TO CLIENT") {
        const agreementLink = `${import.meta.env.VITE_SITE_URL}/contracts/${
          agreement?.id
        }`;
        console.log({ agreementLink });
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

  return (
    <tr className={styles.agreementRecord} onClick={openAgreement}>
      <td>{agreement?.businessName}</td>
      <td>{agreement?.clientName}</td>
      <td>{agreement?.representativeName}</td>
      <td>{agreement?.clientAddress}</td>
      {/* <td>{agreement?.mobile}</td> */}
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
                        handleUpdateStatus("SENT TO CLIENT");
                      }}
                    >
                      <img src="/down.png" alt="" /> Send to client via email
                    </li>
                    <li
                      onClick={() => {
                        if (isLoading) return;
                        handleUpdateStatus("SENT TO CLIENT");
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
    </tr>
  );
}

export default connect(null, { setFlash })(AgreementRecord);
