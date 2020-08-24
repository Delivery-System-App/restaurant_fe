import React, { useEffect, useState } from "react";
import useHeading from "./useHeading";
import { A } from "hookrouter";
import { Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { allHotels, deleteHotel } from "../../redux/apiActions";
import Loader from "../../utils/Loader";
import Confirm from "./ConfirmPage";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@material-ui/core";
const noImage = require("../../assets/images/noimage.jpg");
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

const DashboardPage = () => {
  const classes = useStyles();
  useHeading("My Hotels");
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(allHotels()).then((res) => {
        const len = res.data.data;
        setData(Object.values(len));
        setLoading(false);
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch]);

  const handleConfirm = (e) => {
    dispatch(deleteHotel([e])).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Grid item>
        <A href="/addhotel" className={classes.link}>
          <Link component="button" variant="body2">
            Add New Hotel
          </Link>
        </A>
      </Grid>
      {Loading ? (
        <Loader />
      ) : (
        <Grid container className={classes.container}>
          {Data.map((value, index) => {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      objectFit="contain"
                      className={classes.media}
                      image={noImage}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {value.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {value.contact}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <A href={`/edithotel/${value.id}`}>
                      <Button size="small" color="primary">
                        Edit Hotel
                      </Button>
                    </A>
                    <Confirm
                      handleConfirm={handleConfirm}
                      cancelDialog={"Cancel"}
                      confirmDialog={"Delete"}
                      buttonText={"Delete"}
                      id={value.id}
                      sentence={`You are about to delete hotel ${value.name} ?`}
                    />
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default DashboardPage;
