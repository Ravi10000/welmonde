import styles from "./client-record.module.scss";

import Button from "../../../components/button/button";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { deleteClient } from "../../../firebase/auth";

function ClientRecord({
  client,
  openPopup,
  setClientToEdit,
  handleFetchClients,
  setFlash,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteClient(client.id);
      await handleFetchClients();
      setFlash({ message: "Client deleted successfully", type: "success" });
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <tr className={styles.clientRecord}>
      <td>{client?.representativeName}</td>
      <td>{client?.businessName}</td>
      <td>{client?.email}</td>
      <td>{client?.mobile}</td>
      <td>
        {client?.street}, {client?.city}, {client?.state}, {client?.pincode}
      </td>
      <td className={styles.verticalData}>
        {client?.vertical && client?.vertical?.map((v) => <p key={v}>{v}, </p>)}
      </td>
      {/* <td className={styles.contractNamesContainer}>
        {client?.vertical &&
          client?.vertical?.map((contract) => (
            <p key={contract} className={styles.contractName}>
              {contract}
            </p>
          ))}
      </td> */}
      <td className={styles.actions}>
        {/* <Button
          iconOnly
          action
          onClick={() => {
            setClientToEdit(client);
            openPopup();
          }}
        >
          <img src="/actions/edit.png" alt="" />
        </Button>
        <Button iconOnly destruct onClick={handleDelete}>
          <img src="/actions/delete.png" alt="" />
        </Button> */}
        <Actions
          handleDelete={handleDelete}
          handleEdit={() => {
            setClientToEdit(client);
            openPopup();
          }}
          isDeleting={isDeleting}
        />
      </td>
    </tr>
  );
}

export default connect(null, { setFlash })(ClientRecord);
