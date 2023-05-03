import styles from "./client-record.module.scss";

import Button from "../../../components/button/button";

function ClientRecord({ client, openPopup, setClientToEdit }) {
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
      <td className={styles.actions}>
        <Button
          iconOnly
          action
          onClick={() => {
            setClientToEdit(client);
            openPopup();
          }}
        >
          <img src="/actions/edit.png" alt="" />
        </Button>
        <Button iconOnly destruct>
          <img src="/actions/delete.png" alt="" />
        </Button>
      </td>
    </tr>
  );
}

export default ClientRecord;
