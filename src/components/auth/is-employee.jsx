import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinPage from "../../pages/loading/loading";

function IsEmployee({ currentUser, isLoading, children }) {
  console.log(currentUser?.usertype === "EMPLOYEE");
  const navigate = useNavigate();
  console.log({ currentUser });
  useEffect(() => {
    if (!isLoading && currentUser?.usertype !== "EMPLOYEE") {
      navigate("/");
    }
  }, [isLoading, currentUser]);

  return isLoading ? <LoadinPage /> : children;
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapState)(IsEmployee);
