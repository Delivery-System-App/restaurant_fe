import React from "react";
import useHeading from "./useHeading";
import { Grid } from "@material-ui/core";

const NotFoundPage = () => {
  useHeading("Oops! Not Found");
  const image = require("../../assets/images/notfound.png");
  return (
    <Grid container justify="center">
      <img src={image} alt={"Page not found!!"} />
    </Grid>
  );
};

export default NotFoundPage;
