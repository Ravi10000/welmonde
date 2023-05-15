import styles from "./actions.module.scss";

function Actions({ handleEdit, handleDelete, isDeleting }) {
  return (
    <nav className={styles.actions}>
      <li className={styles.actionItem}>
        <img onClick={handleEdit} src="/actions/pencil.png" alt="" />
      </li>
      <li className={styles.actionItem}>
        {isDeleting ? (
          <div className={styles.loader}></div>
        ) : (
          <img src="/actions/delete-black.png" alt="" onClick={handleDelete} />
        )}
      </li>
    </nav>
  );
}

export default Actions;
