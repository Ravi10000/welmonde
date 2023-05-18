import styles from "./flash.module.scss";
import { useState, useEffect } from "react";

import { connect } from "react-redux";

import { clearFlash } from "../../redux/flash/flash.actions";

const Flash = ({ message, type, clearFlash }) => {
  useEffect(() => {
    // console.log("flash");
    const clearFlashTimeout = setTimeout(function () {
      clearFlash();
      // console.log("cleared");
    }, 8000);
    return () => {
      clearTimeout(clearFlashTimeout);
    };
  }, [clearFlash, message, type]);

  return (
    <div
      className={styles.flash + " " + styles[type]}
      style={{
        display: !message ? "none" : "flex",
        boxShadow: `0px 0px 1px var(--${type})`,
      }}
    >
      {message && (
        <>
          <div className={styles.main}>
            <img src={`/flash-icons/${type}.png`} alt={type} />
            <p>{message}</p>
          </div>
          <button
            className={styles.close}
            onClick={() => {
              clearFlash();
            }}
          >
            <img src={`/flash-icons/close-${type}.png`} alt="" />
          </button>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearFlash: () => dispatch(clearFlash()),
});

export default connect(null, mapDispatchToProps)(Flash);
