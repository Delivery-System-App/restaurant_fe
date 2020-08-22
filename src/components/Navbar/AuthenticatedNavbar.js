import React from "react";
import PropTypes from "prop-types";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Navbar from "./Navbar";
import { navigate } from "hookrouter";

const AuthenticatedNavbar = ({ page }) => {
  const drawer = [
    {
      path: "/",
      text: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      path: "/user/profile",
      text: "Profile",
      icon: <AccountCircleIcon />,
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

AuthenticatedNavbar.propTypes = {
  page: PropTypes.element,
};

export default AuthenticatedNavbar;
