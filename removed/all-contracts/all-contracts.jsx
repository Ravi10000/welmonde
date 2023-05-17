import styles from "./all-contracts.module.scss";
import { useState, useRef, useEffect } from "react";
import Contract from "./contract/contract";
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

function AllContractsPage() {
  const [showMore, setShowMore] = useState(false);
  const docRef = useRef(null);
  console.log({ showMore });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (docRef.current && !docRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [docRef]);

  return (
    <div className={styles.allEmployees}>
      <h1 className="__pageHeading __subColorHeading">All Contracts</h1>
      <div className="__tableContainer">
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
                <Contract contract={contract} key={i} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllContractsPage;
