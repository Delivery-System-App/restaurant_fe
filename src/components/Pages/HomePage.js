import React, { useEffect, useState } from "react";
import useHeading from "./useHeading";
import { Grid, Typography, Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dimensions from "./Dimensions";
import Login from "./LoginPage";

const bannerImg = require("../../assets/images/banner.svg");
const loginImg = require("../../assets/images/login.svg");

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
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  container: {
    marginTop: "10px",
    padding: 10,
  },
  img: {
    maxWidth: "100%",
    maxHeight: "75%",
  },
  heading: {
    fontSize: 60,
    fontWeight: "bold",
  },
  banner: {
    alignItems: "center",
    marginTop: 5,
  },
  card: {
    paddingBottom: 50,
  },
  moto: {
    fontWeight: "semibold",
    fontSize: 20,
    fontStyle: "italic",
  },
  media: {
    // height: 180,
    backgroundImage: "url(" + loginImg + ")",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%",
  },
}));

const HomePage = () => {
  useHeading("Home");
  const { height, width } = Dimensions();
  const [dim, setdim] = useState({ height: height, width: width });
  useEffect(() => {
    setdim({ height: height, width: width });
  }, [height, width]);
  const classes = useStyles();
  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item alignItems="center" className={classes.banner} xs={12} sm={6}>
        <div>
          <img
            alt="newpic"
            style={{
              height: dim.height / 2,
              width: "auto",
            }}
            src={bannerImg}
          ></img>
          <div id="bannertitle" className="text-center">
            <Typography className={classes.heading}>SKOSH</Typography>
            <Typography className={classes.moto}>
              " We aim to provide the best food services to you."
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card className={classes.card}>
          <CardMedia className={classes.media}>
            <Login />
          </CardMedia>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
