import styles from "./custom-select.module.scss";
import { useState, useEffect } from "react";

export default function CustomSelect({
  options,
  selectedOption,
  setSelectedOption,
  label,
  defaultValue,
}) {
  const [showOptions, setShowOptions] = useState(false);

  // useEffect(() => {
  //   if (defaultValue) {
  //     const defaultOption = options.filter((option) => {
  //       console.log({ option });
  //       return option._id === defaultValue;
  //     });
  //     console.log({ defaultCategory: defaultOption });
  //     setSelectedOption(defaultOption[0]);
  //   }
  // }, [options]);
  return (
    <div className={styles["custom-select"]}>
      {!selectedOption ? (
        <div
          className={styles["selector"]}
          onClick={() => {
            setShowOptions((prevState) => !prevState);
          }}
        >
          <p>{label}</p>
          <img
            className={showOptions ? styles.rotate : ""}
            src="/down.png"
            alt="select"
          />
        </div>
      ) : (
        <div
          className={styles["selected-option"]}
          onClick={() => {
            setShowOptions((prevState) => !prevState);
          }}
        >
          <div>
            <p>
              {selectedOption?.businessName}
              {/* {selectedOption?.businessName +
                " / " +
                selectedOption?.representativeName} */}
            </p>
          </div>
          <img
            className={showOptions ? styles.rotate : ""}
            src="/down.png"
            alt="select"
          />
        </div>
      )}
      {showOptions && (
        <div className={styles["options"]}>
          {options?.map((option) => {
            return (
              <div
                className={styles["option"]}
                key={option.id}
                onClick={() => {
                  setSelectedOption(option);
                  setShowOptions(false);
                }}
              >
                <p>
                  {option?.businessName}
                  {/* {option?.businessName + " / " + option?.representativeName} */}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
