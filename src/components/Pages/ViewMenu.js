import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewMenu } from "../../redux/apiActions";
import { A } from "hookrouter";
import { Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  root: {
    maxWidth: 345,
    marginTop: 15,
    margin: "0px auto",
  },
  media: {
    height: 180,
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
  container: {
    marginTop: "10px",
  },
}));

const ViewMenu = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewMenu([id])).then((res) => {
      console.log(res);
      if (res.data) {
        console.log(res.data);
      }
    });
  }, [id, dispatch]);
  return (
    <div>
      <Grid item>
        <A href={`/hotel/${id}/addmenu`} className={classes.link}>
          <Link component="button" variant="body2">
            Add Menu
          </Link>
        </A>
      </Grid>
    </div>
  );
};

export default ViewMenu;
