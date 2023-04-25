import styles from "./App.module.scss";

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SigninPage from "./pages/signin/signin";
import HomePage from "./pages/home/home";
import AdminSigninPage from "./pages/admin-signin/admin-signin";
import AllAdminsPage from "./pages/all-admins/all-admins";
import Sidebar from "./layouts/sidebar/sidebar";
import AllEmployeesPage from "./pages/all-employees/all-employees";
import AllClientsPage from "./pages/all-clients/all-clients";
import AllContractsPage from "./pages/all-contracts/all-contracts";
import Header from "./layouts/header/header";

function App() {
  const { pathname } = useLocation();
  console.log({ pathname });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPostLogin, setIsPostLogin] = useState(false);

  const adminRoutes = ["/admins", "/employees", "/clients", "/contracts"];

  useEffect(() => {
    if (pathname === "/") {
      return setIsPostLogin(false);
    }
    adminRoutes.forEach((route) => {
      pathname.includes(route) && setIsPostLogin(true);
    });
  }, [pathname]);

  return (
    <div className={`${isPostLogin ? styles.postLoginPage : ""}`}>
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
          <Route exact path="/admin" element={<AdminSigninPage />} />

          <Route exact path="/admins" element={<AllAdminsPage />} />
          <Route exact path="/employees" element={<AllEmployeesPage />} />
          <Route exact path="/clients" element={<AllClientsPage />} />
          <Route exact path="/contracts" element={<AllContractsPage />} />

          <Route exact path="/" element={<SigninPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
