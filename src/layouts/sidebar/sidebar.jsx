import styles from "./sidebar.module.scss";

// packages
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { createStructuredSelector } from "reselect";

// components
import SidebarOption from "./sidebar-option/sidebar-option";

// custom hooks
// import { useSelectedPage } from "../../contexts/selectedPageContext";
// import { selectCurrentUser } from "../../redux/user/user.selectors";
// import { connect } from "react-redux";

const options = [
  {
    name: "admins",
    icon: "/page-icons/admin.png",
    iconDark: "/page-icons/admin-dark.png",
  },
  {
    name: "employees",
    icon: "/page-icons/employee.png",
    iconDark: "/page-icons/employee-dark.png",
  },
  {
    name: "clients",
    icon: "/page-icons/client.png",
    iconDark: "/page-icons/client-dark.png",
  },
  {
    name: "contracts",
    icon: "/page-icons/contract.png",
    iconDark: "/page-icons/contract-dark.png",
  },
];
// const adminOptions = [
//   {
//     name: "manage-subscriptions",
//     icon: "/page-icons/subscription.png",
//     iconDark: "/page-icons/subscription-dark.png",
//   },
//   {
//     name: "users",
//     icon: "/page-icons/users.png",
//     iconDark: "/page-icons/users-dark.png",
//   },
//   {
//     name: "admins",
//     icon: "/page-icons/admin.png",
//     iconDark: "/page-icons/admin-dark.png",
//   },
//   {
//     name: "analysis",
//     icon: "/page-icons/dashboard.png",
//     iconDark: "/page-icons/dashboard-dark.png",
//   },
//   {
//     name: "payments",
//     icon: "/page-icons/card.png",
//     iconDark: "/page-icons/card-dark.png",
//   },
// ];

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  // console.log({ currentUser });
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const sidebarRef = useRef(null);
  const { page } = useParams();
  const { pathname } = useLocation();
  console.log({ pathname });
  const [selectedPage, setSelectedPage] = useState(pathname);

  useEffect(() => {
    setSelectedPage(pathname);
  }, [pathname]);

  useEffect(() => {
    // if (currentUser?.usertype === "ADMIN") setIsAdmin(true);
    function handleMouseDown(e) {
      if (!sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    }
    addEventListener("mousedown", handleMouseDown);
    return () => {
      removeEventListener("mousedown", handleMouseDown);
    };
  }, [sidebarRef]);

  return (
    <section
      className={`${styles.sidebar} ${isSidebarOpen && styles.active}`}
      ref={sidebarRef}
    >
      <div className={styles.closeSidebar} onClick={() => navigate("/")}>
        {/* <img src="/welmonde-logo.jpg" alt="<brand>" /> */}
        <img src="/logo-transparent.png" alt="<brand>" />
      </div>
      <div className={styles.optionsContainer}>
        {options?.map((option) => (
          <SidebarOption
            key={option.name}
            name={option.name}
            icon={
              !selectedPage.includes(option.name)
                ? option.icon
                : option.iconDark
            }
            selected={selectedPage.includes(option.name)}
            onClick={() => {
              setIsSidebarOpen(false);
              navigate(`/${option.name}`);
            }}
          />
        ))}
        {/* {isAdmin &&
          adminOptions?.map((option) => (
            <SidebarOption
              key={option.name}
              name={option.name}
              icon={
                !selectedPage.includes(option.name)
                  ? option.icon
                  : option.iconDark
              }
              selected={selectedPage.includes(option.name)}
              onClick={() => {
                setIsSidebarOpen(false);
                navigate(`/${option.name}`);
              }}
            />
          ))} */}
      </div>
    </section>
  );
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
// });
// export default connect(mapStateToProps)(Sidebar);
export default Sidebar;
