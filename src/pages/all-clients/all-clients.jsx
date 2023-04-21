import styles from "./all-clients.module.scss";

function AllClientsPage() {
  return (
    <div className={styles.allClients}>
      <h1 className="__pageHeading">All Clients</h1>
      <div className="__tableContainer">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                Client Name
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Client Email
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Client Phone
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Generated
                <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Signed
                <img src="/sorting.png" alt="sort" />
              </th>
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
                  <td>40</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllClientsPage;
