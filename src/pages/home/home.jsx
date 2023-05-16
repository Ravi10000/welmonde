import styles from "./home.module.scss";
import { useNavigate } from "react-router-dom";
// import Button from "../../components/button/button";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.btnsContainer}>
            <button
              className={styles.signin}
              onClick={() => navigate("/signin")}
            >
              Get Started
            </button>
            <button
              className={styles.adminSignin}
              onClick={() => navigate("/admin/signin")}
            >
              Admin / Employee
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
