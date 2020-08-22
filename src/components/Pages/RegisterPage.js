import React from "react";
import useHeading from "./useHeading";
import Register from "../Authentication/Register";

const RegisterPage = () => {
  useHeading("Register");

  return <Register />;
};

export default RegisterPage;
