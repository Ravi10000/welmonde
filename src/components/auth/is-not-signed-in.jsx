import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinPage from "../../pages/loading/loading";

function IsNotSignedIn({ currentUser, isLoading, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && currentUser) {
      if (currentUser.usertype === "ADMIN") return navigate("/admin");
      if (currentUser.usertype === "EMPLOYEE") return navigate("/employee");
      navigate("/dashboard");
    }
  }, [isLoading, currentUser]);

  return isLoading ? <LoadinPage /> : children;
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(IsNotSignedIn);
