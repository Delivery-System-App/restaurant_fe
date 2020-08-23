import React, { useEffect, useState } from "react";
import useHeading from "./useHeading";
import { A } from "hookrouter";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { allHotels } from "../../redux/apiActions";
import Loader from "../../utils/Loader";
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
    setLoading(true);
    dispatch(allHotels()).then((res) => {
      console.log(res.data.data);
      const len = res.data.data;
      setData(Object.values(len));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Grid item container justify="center" style={{ marginBottom: "20px" }}>
        <Button variant="outlined" color="primary" style={{ outline: "none" }}>
          <A
            href="/addhotel"
            className={classes.link}
            style={{
              color: "#757de8",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Add New Hotel
          </A>
        </Button>
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
                    <Button
                      size="small"
                      color="primary"
                      style={{ outline: "none", color: "#757de8" }}
                    >
                      Edit Hotel
                    </Button>
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
