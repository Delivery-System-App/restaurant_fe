import React, { useState } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UseHeading from "./useHeading";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    margin: "0px auto",
    textAlign: "center",
    maxWidth: "500px",
  },
  media: {
    margin: "0px auto",
    height: "150px",
    width: "150px",
  },
  number: {
    fontSize: 18,
  },
  email: {
    fontSize: 15,
  },
});

export default function ImgMediaCard() {
  UseHeading("Profile");
  const classes = useStyles();
  const state = useSelector((reduxState) => reduxState);
  const currentUser = state.newapi.currentUser.data.data;
  return (
    <Card className={classes.root}>
      <Avatar
        className={classes.media}
        src="https://cdn4.iconfinder.com/data/icons/jetflat-2-faces-2/60/005b_042_user_profile_avatar_man_boy_round-512.png"
      ></Avatar>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {currentUser.name}
        </Typography>
        <Typography gutterBottom className={classes.number}>
          <PhoneIcon fontSize="small" /> {currentUser.number}
        </Typography>
        <Typography gutterBottom className={classes.email}>
          {currentUser.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Edit profile
        </Button>
      </CardActions>
    </Card>
  );
}
