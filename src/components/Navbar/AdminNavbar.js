import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";

const AdminNavbar = ({ page }) => {
  const drawer = [
    {
      path: "/",
      text: "Admin Dashboard",
      icon: <DashboardIcon />,
    },
    { divider: true },
    {
      fn: async () => {
        localStorage.removeItem("access_token");
        navigate("/");
        window.location.reload();
      },
      text: "Logout",
      icon: <VpnKeyIcon />,
    },
  ];

  return <Navbar drawer={drawer} page={page} />;
};

AdminNavbar.propTypes = {
  page: PropTypes.element,
};

export default AdminNavbar;
