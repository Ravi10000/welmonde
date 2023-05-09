import styles from "./signout.module.scss";

function SignoutPage() {
  return (
    <div className={styles.signoutPage}>
      <div className={styles.signout}>
        <h3>
          Are you sure you want to sign out? This will log you out of your
          account and you will need to enter your credentials again to log back
          in. Click 'Signout' to sign out or 'Cancel' to stay logged in.
        </h3>
        <div className={styles.btnContainer}>
          <button>Signout</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SignoutPage;
