import { useEffect } from "react";
import styles from "./is-admin.module.scss";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function IsAdmin({ currentUser, isLoading, children }) {
  console.log(currentUser?.userType === "ADMIN");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && currentUser?.userType !== "ADMIN") {
      console.log("not admin");
      console.log({ usertype: currentUser?.userType, isLoading });
      navigate("/");
    }
  }, [isLoading, currentUser]);

  console.log({ currentUser, isLoading });
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
export default connect(mapState)(IsAdmin);
