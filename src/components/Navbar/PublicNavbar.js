import React from "react";
import PropTypes from "prop-types";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import Navbar from "./Navbar";

const PublicNavbar = ({ page }) => {
  const drawer = [
    {
      path: "/",
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      path: "/about",
      text: "About",
      icon: <InfoIcon />,
    },
    { divider: true },
    {
      path: "/login",
      text: "Login",
      icon: <VpnKeyIcon />,
    },
    {
      path: "/register",
      text: "Register",
      icon: <LockIcon />,
    },
  ];

  return <Navbar drawer={drawer} page={page} />;
};

PublicNavbar.propTypes = {
  page: PropTypes.element,
};

export default PublicNavbar;
