import styles from "./sign-in-hero.module.scss";

function SignInHero() {
  return (
    <section className={styles.signinHero}>
      <div className={styles.content}>
        <h1 className={styles.tagLine}>
          Nation's Largest Health Care Platform
        </h1>
      </div>
    </section>
  );
}

export default SignInHero;
