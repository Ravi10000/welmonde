import styles from "./all-admins.module.scss";

function AllAdminsPage() {
  return (
    <div className={styles.allAdmins}>
      <h1 className="__pageHeading">All Admins</h1>
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
              {/* <th>Total Contracts Signed</th> */}
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAdminsPage;
