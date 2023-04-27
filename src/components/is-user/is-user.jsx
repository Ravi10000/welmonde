import { useEffect } from "react";
import styles from "./is-user.module.scss";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function IsUser({ currentUser, isLoading, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/signin");
    }
  }, [isLoading, currentUser]);

  return isLoading ? (
    <div className={styles.loading}>
      <h1>loading...</h1>
    </div>
  ) : (
    children
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(IsUser);
