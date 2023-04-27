import styles from "./profile.module.scss";
import Button from "../../components/button/button";
import { getAuth, signOut } from "firebase/auth";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

function ProfilePage({ setCurrentUser, setFlash }) {
  const auth = getAuth();
  async function handleSignOut() {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setFlash({
        type: "success",
        message: "Signed out successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.profilePage}>
      <h2>Profile Page</h2>
      <Button fit outlined danger onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}

export default connect(null, { setCurrentUser, setFlash })(ProfilePage);
