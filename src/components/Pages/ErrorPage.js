import React from "react";
import UseHeading from "./useHeading";

const ErrorPage = () => {
  UseHeading("Error");
  return <div>Error in Connecting to Backend!</div>;
};

export default ErrorPage;
