import styles from "./header.module.scss";

import Button from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function Header({ currentUser }) {
  const navigate = useNavigate();
  return (
    <header>
      <img
        className={styles.logo}
        src="/logo-transparent.png"
        alt=""
        onClick={() => navigate("/")}
      />
      {currentUser ? (
        // currentUser?.usertype === "ADMIN" ? (
        <Button
          fit
          outlined
          onClick={() =>
            navigate(
              currentUser?.usertype === "ADMIN"
                ? "/admin"
                : currentUser?.usertype === "EMPLOYEE"
                ? "/employee"
                : "/profile"
            )
          }
        >
          Dashboard
        </Button>
      ) : (
        // )
        // : (
        //   <Button fit outlined onClick={() => navigate("/profile")}>
        //     Profile
        //   </Button>
        // )
        <div className={styles.btnsContainer}>
          <Button fit outlined onClick={() => navigate("/signin")}>
            Get Started
          </Button>
          <Button fit onClick={() => navigate("/admin/signin")}>
            Admin
          </Button>
        </div>
      )}
    </header>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(Header);
