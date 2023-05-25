import styles from "./App.module.scss";

import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SigninPage from "./pages/signin/signin";
import HomePage from "./pages/home/home";
import AdminSigninPage from "./pages/admin-signin/admin-signin";
import AllAdminsPage from "./pages/all-admins/all-admins";
import Sidebar from "./layouts/sidebar/sidebar";
import AllEmployeesPage from "./pages/all-employees/all-employees";
// import AllContractsPage from "./pages/all-contracts/all-contracts";
import Header from "./layouts/header/header";

// import { useAuthState } from "react-firebase-hooks/auth";
import { setCurrentUser } from "./redux/user/user.actions";
import { connect } from "react-redux";
import IsAdmin from "./components/auth/is-admin";
// import { checkUserAuth } from "./firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ClientDashboard from "./pages/client-dashboard/client-dashboard";
import IsUser from "./components/auth/is-user";
import IsNotSignedIn from "./components/auth/is-not-signed-in";
import Flash from "./components/flash/flash";
import LoadinPage from "./pages/loading/loading";
import { fetchClienDetails, fetchUser } from "./firebase/auth";
import MyAgreementsPage from "./pages/my-agreements/my-agreements";
import IsEmployee from "./components/auth/is-employee";
import ContractsPage from "./pages/contracts/contracts-page";
import MyClientsPage from "./pages/my-clients/my-clients";
import ScrollToTop from "./components/scrollToTop";

function App({ setCurrentUser, flash }) {
  const { pathname } = useLocation();
  console.log(pathname.split("/")[1]);
  const [fetchingUser, setFetchingUser] = useState(true);

  console.log({ pathname });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPostLogin, setIsPostLogin] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const adminRoutes = ["/admins", "/employees", "/clients", "/contracts"];
  async function handleCheckAuth() {
    setFetchingUser(true);
    const auth = getAuth();
    onAuthStateChanged(auth, async (userSnapshot) => {
      console.log({ userSnapshot });
      if (userSnapshot) {
        let user = await fetchUser(userSnapshot.uid);
        // if (!user) user = await fetchClienDetails(userSnapshot.uid);
        if (user)
          setCurrentUser({
            ...user,
            uid: userSnapshot?.uid,
            createdAt: new Date(user?.createdAt?.seconds).toString(),
          });
        setFetchingUser(false);
      } else {
        setFetchingUser(false);
      }
    });
  }
  useEffect(() => {
    console.log({ siteUrl: import.meta.env.VITE_SITE_URL });
    handleCheckAuth();
  }, []);
  useEffect(() => {
    if (pathname === "/") {
      // setHideHeader(true);
      return setIsPostLogin(false);
    } else {
      setHideHeader(false);
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
      <ScrollToTop />
      {flash && <Flash type={flash.type} message={flash.message} />}
      {/* <Flash type={"warning"} message={"This is a test flash message."} /> */}
      {!isPostLogin && !hideHeader && <Header />}
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
                  <MyClientsPage adminPrivilages />
                </IsAdmin>
              }
            />
            <Route
              exact
              path="/admin/contracts"
              element={
                <IsAdmin isLoading={fetchingUser}>
                  {/* <AllAgreements /> */}
                  <MyAgreementsPage adminPrivilages />
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
              exact
              path="/employee/clients"
              element={
                <IsEmployee isLoading={fetchingUser}>
                  <MyClientsPage />
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
            path="/dashboard"
            element={
              <IsUser isLoading={fetchingUser}>
                <ClientDashboard />
              </IsUser>
            }
          />
          <Route
            exact
            path="/contracts/:agreementId"
            element={
              // <IsUser isLoading={fetchingUser}>
              <ContractsPage />
              // </IsUser>
            }
          />
          {/* <Route path="admin/signout" element={<SignoutPage />} /> */}
          {/* <Route path="employee/signout" element={<SignoutPage />} /> */}
          <Route
            exact
            path="/"
            element={
              <IsNotSignedIn>
                <SigninPage />
              </IsNotSignedIn>
            }
          />
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
