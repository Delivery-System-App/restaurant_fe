import React from "react";
import useHeading from "./useHeading";
import { Grid } from "@material-ui/core";

const NotFoundPage = () => {
  useHeading("Oops! Not Found");
  const image = require("../../assets/images/notfound.svg");
  return (
    <Grid container className="px-3" justify="center">
      <img
        className="mt-40 md:mt-10 lg:mt-5"
        src={image}
        alt={"Page not found!!"}
      />
    </Grid>
  );
};

export default NotFoundPage;
