import styles from "./popup.module.scss";
import Backdrop from "../backdrop/backdrop";
import Button from "../button/button";

import { useRef, useEffect } from "react";

function Popup({
  handleSave,
  title,
  save,
  cancel,
  children,
  closePopup,
  isLoading,
}) {
  const popupRef = useRef(null);
  useEffect(() => {
    function handleClosePopup(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    }
    addEventListener("mousedown", handleClosePopup);
    return () => {
      removeEventListener("mousedown", handleClosePopup);
    };
  }, [popupRef]);
  return (
    <Backdrop>
      <div className={styles.popup} ref={popupRef}>
        <div className={styles.popupHead}>
          <h4 className={styles.title}>{title}</h4>
          <img
            className={styles.closeIcon}
            src="/close.png"
            alt="close"
            onClick={() => closePopup()}
          />
        </div>
        <div className={styles.inputsContainer}>{children}</div>
        <div className={styles.btnContainer}>
          <Button isLoading={isLoading} onClick={handleSave && handleSave}>
            {save || "save"}
          </Button>
          <Button
            outlined
            onClick={closePopup && closePopup}
            isLoading={isLoading}
            type="button"
          >
            {cancel || "cancel"}
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}

export default Popup;
