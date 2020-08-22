import React from "react";
import useHeading from "./useHeading";
import Login from "../Authentication/Login";

const LoginPage = () => {
  useHeading("Login");

  return <Login />;
};

export default LoginPage;
