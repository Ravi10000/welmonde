import styles from "./home.module.scss";

function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to the home page</h1>
          <p className={styles.heroSubtitle}>This is the home page subtitle</p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
