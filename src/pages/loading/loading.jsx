import styles from "./loading.module.scss";

function LoadinPage() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default LoadinPage;
