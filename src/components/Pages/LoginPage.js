import React from "react";
import useHeading from "./useHeading";
import Login from "../Authentication/Login";

function LoginPage() {
  useHeading("Login");

  return <Login />;
}

export default LoginPage;
