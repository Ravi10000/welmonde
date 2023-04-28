import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinPage from "../../pages/loading/loading";

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

  return isLoading ? <LoadinPage /> : children;
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapState)(IsAdmin);
