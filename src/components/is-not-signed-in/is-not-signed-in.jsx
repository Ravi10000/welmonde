import { useEffect } from "react";
import styles from "./is-not-signed-in.module.scss";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function IsNotSignedIn({ currentUser, isLoading, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && currentUser) {
      navigate("/");
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
export default connect(mapState)(IsNotSignedIn);
