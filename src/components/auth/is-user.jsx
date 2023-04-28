import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinPage from "../../pages/loading/loading";

function IsUser({ currentUser, isLoading, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate("/signin");
    }
  }, [isLoading, currentUser]);

  return isLoading ? <LoadinPage /> : children;
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState)(IsUser);
