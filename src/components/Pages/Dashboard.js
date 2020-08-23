import React, { useEffect, useState } from "react";
import useHeading from "./useHeading";
import { A } from "hookrouter";
import { Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { allHotels } from "../../redux/apiactions";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
}));

const DashboardPage = () => {
  const classes = useStyles();
  useHeading("My Hotels");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allHotels()).then((res) => {
      console.log(res.data.data);
    });
  }, []);
  return (
    <>
      <div>DashboardPage</div>
      <Grid item>
        <A href="/addhotel" className={classes.link}>
          <Link component="button" variant="body2">
            Add New Hotel
          </Link>
        </A>
      </Grid>
    </>
  );
};

export default DashboardPage;
