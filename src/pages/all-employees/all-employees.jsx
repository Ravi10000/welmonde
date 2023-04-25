import styles from "./all-employees.module.scss";
import Button from "../../components/button/button";
import { useRef, useState, useEffect } from "react";
import Backdrop from "../../components/backdrop/backdrop";
import Contract from "../all-contracts/contract/contract";
function AllEmployeesPage() {
  const [showContracts, setShowContracts] = useState(false);
  const popupRef = useRef();

  const contract = {
    name: "Contract Title",
    employee: "some employee",
    status: "pending",
    client: "some client",
    // contents: [
    //   {
    //     title: "Agreement 1",
    //   },
    //   {
    //     title: "Agreement 2",
    //   },
    //   {
    //     title: "Agreement 3",
    //   },
    // ],
  };
  useEffect(() => {
    function handleClosePopup(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowContracts(false);
      }
    }
    addEventListener("mousedown", handleClosePopup);
    return () => {
      removeEventListener("mousedown", handleClosePopup);
    };
  }, [popupRef]);
  return (
    <div className={styles.allEmployees}>
      {showContracts && (
        <Backdrop>
          <div className={styles.contractPopup} ref={popupRef}>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Contract Name</th>
                  <th>Employee</th>
                  <th>Status</th>
                  <th>Client</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array(25)
                  .fill()
                  .map((_, i) => (
                    <Contract contract={contract} />
                  ))}
              </tbody>
            </table>
          </div>
        </Backdrop>
      )}
      <h1 className="__pageHeading __subColorHeading">All Employees</h1>
      <div className={styles.cardsAndBtn}>
        <section className={styles.cardsContainer}>
          <div className={styles.card}>
            <p>12000</p>
            <h4>Total Employees</h4>
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
        >
          <p>Add Employee</p>
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
                Employee Name <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Employee Email <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Employee Phone <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Generated <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Signed <img src="/sorting.png" alt="sort" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(100)
              .fill()
              .map((_, i) => (
                <tr
                  key={i}
                  onClick={() => setShowContracts((prevState) => !prevState)}
                >
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Ravi Sharma</td>
                  <td>ravisince2k@gmail.com</td>
                  <td>9560863067</td>
                  <td>102</td>
                  <td>52</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllEmployeesPage;
