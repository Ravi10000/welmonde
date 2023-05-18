import styles from "./data-card.module.scss";

function DataCard({ icon, title, data }) {
  return (
    <div className={styles.dataCard}>
      <img className={styles.icon} src={icon} alt={title} />
      <p className={styles.data}>{data}</p>
      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default DataCard;
