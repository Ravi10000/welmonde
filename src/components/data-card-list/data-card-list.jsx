import styles from "./data-card-list.module.scss";

function DataCardList({ children }) {
  return <section className={styles.cardsContainer}>{children}</section>;
}

export default DataCardList;
