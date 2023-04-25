import styles from "./header.module.scss";

import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <img
        className={styles.logo}
        src="/logo-transparent.png"
        alt=""
        onClick={() => navigate("/")}
      />
      <Button fit outlined onClick={() => navigate("/")}>
        Get Started
      </Button>
    </header>
  );
}

export default Header;
