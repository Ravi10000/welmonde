import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinPage from "../../pages/loading/loading";

function IsAdmin({ currentUser, isLoading, children }) {
  console.log(currentUser?.usertype === "ADMIN");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && currentUser?.usertype !== "ADMIN") {
      console.log("not admin, redirecting to homepage");
      navigate("/admin/signin");
    }
  }, [isLoading, currentUser]);

  return isLoading ? <LoadinPage /> : children;
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapState)(IsAdmin);
