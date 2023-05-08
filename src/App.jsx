import styles from "./App.module.scss";

import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SigninPage from "./pages/signin/signin";
import HomePage from "./pages/home/home";
import AdminSigninPage from "./pages/admin-signin/admin-signin";
import AllAdminsPage from "./pages/all-admins/all-admins";
import Sidebar from "./layouts/sidebar/sidebar";
import AllEmployeesPage from "./pages/all-employees/all-employees";
import AllClientsPage from "./pages/all-clients/all-clients";
// import AllContractsPage from "./pages/all-contracts/all-contracts";
import Header from "./layouts/header/header";

import app from "./firebase/index";
// import { useAuthState } from "react-firebase-hooks/auth";
import { setCurrentUser } from "./redux/user/user.actions";
import { connect } from "react-redux";
import IsAdmin from "./components/auth/is-admin";
// import { checkUserAuth } from "./firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfilePage from "./pages/profile/profile";
import IsUser from "./components/auth/is-user";
import IsNotSignedIn from "./components/auth/is-not-signed-in";
import Flash from "./components/flash/flash";
import LoadinPage from "./pages/loading/loading";
import { fetchUser } from "./firebase/auth";
import MyAgreementsPage from "./pages/employee/my-agreements/my-agreements";
import IsEmployee from "./components/auth/is-employee";
import AllAgreements from "./pages/all-agreements/all-agreements";
import ContractsPage from "./pages/contracts/contracts-page";

function App({ setCurrentUser, flash }) {
  const { pathname } = useLocation();
  console.log(pathname.split("/")[1]);
  const [fetchingUser, setFetchingUser] = useState(true);

  console.log({ pathname });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPostLogin, setIsPostLogin] = useState(false);

  const adminRoutes = ["/admins", "/employees", "/clients", "/contracts"];
  async function handleCheckAuth() {
    setFetchingUser(true);
    const auth = getAuth();
    onAuthStateChanged(auth, async (userSnapshot) => {
      if (userSnapshot) {
        await fetchUser(userSnapshot.uid).then((user) => {
          console.log({ user });
          if (user) setCurrentUser({ ...user, createdAt: "" });
          // setCurrentUser({ email: user?.email, usertype: user?.usertype });
          setFetchingUser(false);
        });
      } else {
        setFetchingUser(false);
      }
    });
  }
  useEffect(() => {
    handleCheckAuth();
  }, []);
  useEffect(() => {
    if (pathname === "/") {
      return setIsPostLogin(false);
    }
    // adminRoutes.forEach((route) => {
    //   pathname.includes(route) && setIsPostLogin(true);
    // });

    if (
      pathname.split("/")[1] === "admin" ||
      pathname.split("/")[1] === "employee"
    ) {
      if (pathname.includes("signin")) return setIsPostLogin(false);
      setIsPostLogin(true);
    }
  }, [pathname]);

  return (
    <div className={`${isPostLogin ? styles.postLoginPage : ""}`}>
      {flash && <Flash type={flash.type} message={flash.message} />}
      {!isPostLogin && <Header />}
      {isPostLogin && (
        <>
          <div className={styles.toggleSideBar}>
            <img
              onClick={() => setIsSidebarOpen((prevState) => !prevState)}
              src={isSidebarOpen ? "/close-2.png" : "/menus.png"}
              alt="menu"
            />
          </div>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </>
      )}
      <div className={`${isPostLogin ? styles.page : ""}`}>
        <Routes>
          <Route exact path="/admin/signin" element={<AdminSigninPage />} />
          <>
            <Route
              exact
              path="/admin/admins"
              element={
                <IsAdmin isLoading={fetchingUser}>
                  <AllAdminsPage />
                </IsAdmin>
              }
            />
            <Route
              exact
              path="/admin/employees"
              element={
                <IsAdmin isLoading={fetchingUser}>
                  <AllEmployeesPage />
                </IsAdmin>
              }
            />
            <Route
              exact
              path="/admin/clients"
              element={
                <IsAdmin isLoading={fetchingUser}>
                  <AllClientsPage />
                </IsAdmin>
              }
            />
            <Route
              exact
              path="/admin/contracts"
              element={
                <IsAdmin isLoading={fetchingUser}>
                  <AllAgreements />
                </IsAdmin>
              }
            />
            <Route
              path="/admin/:anythingElse"
              element={<Navigate to="/admin/admins" />}
            />
            <Route path="/admin" element={<Navigate to="/admin/admins" />} />
          </>
          <>
            <Route
              exact
              path="/employee/myagreements"
              element={
                <IsEmployee isLoading={fetchingUser}>
                  <MyAgreementsPage />
                </IsEmployee>
              }
            />
            <Route
              path="/employee"
              element={<Navigate to="/employee/myagreements" />}
            />
            <Route
              path="/employee/:anythingElse"
              element={<Navigate to="/employee/myagreements" />}
            />
          </>
          <Route
            exact
            path="/signin"
            element={
              <IsNotSignedIn isLoading={fetchingUser}>
                <SigninPage />
              </IsNotSignedIn>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <IsUser isLoading={fetchingUser}>
                <ProfilePage />
              </IsUser>
            }
          />
          <Route
            exact
            path="/contracts/:agreementId"
            element={
              <IsUser isLoading={fetchingUser}>
                <ContractsPage />
              </IsUser>
            }
          />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/:id" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  flash: state.flash,
});

export default connect(mapState, {
  setCurrentUser,
})(App);
