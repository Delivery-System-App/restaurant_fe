import React, { useEffect, useState } from "react";
import useHeading from "./useHeading";
import { A } from "hookrouter";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { allHotels, deleteHotel } from "../../redux/apiActions";
import Loader from "../../utils/Loader";
import Confirm from "./ConfirmPage";
import Notify from "../../utils/Notify";
import Carousal from "./Carousal";
import StatusIndicator from "./StatusIndicator";
import RateReviewIcon from "@material-ui/icons/RateReview";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
} from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
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
    marginTop: "5px",
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
  useHeading("My Restaurants");
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [reRender, setreRender] = useState(Math.random());
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(allHotels()).then((res) => {
        if (res && res.data) {
          const len = res.data.data;
          setData(Object.values(len));
          console.log(Object.values(len));
          setLoading(false);
        }
        setLoading(false);
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch, reRender]);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleConfirm = (e) => {
    setLoading(true);
    dispatch(deleteHotel([e])).then((res) => {
      if (res)
        if (res.status === 200) {
          setnotify({
            msg: "Hotel Deleted",
            type: "success",
            popup: true,
          });
          setreRender(Math.random());
        }
    });
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  return (
    <>
      <Grid item container justify="center" style={{ marginBottom: "5px" }}>
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
      <SearchBar searchChange={handleSearchChange} />
      {Loading ? (
        <Loader />
      ) : (
        <Grid container className={classes.container}>
          {Data.map((value, index) => {
            return (
              value.name.toLowerCase().includes(filter.toLowerCase()) && (
                <Grid key={index + 1} item xs={12} md={6} lg={4}>
                  <Card className={classes.root}>
                    <CardMedia className={classes.media} title="Hotel Image">
                      <Carousal
                        images={value.photos ? value.photos : noImage}
                      />
                    </CardMedia>
                    <A href={`/hotel/${value.id}`}>
                      <CardContent>
                        <Typography
                          className="truncate"
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
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
                    </A>
                    <CardActions>
                      <div className="w-2/3 flex">
                        <div className="mr-2">
                          <A href={`/edithotel/${value.id}`}>
                            <Button
                              size="small"
                              color="primary"
                              style={{ outline: "none" }}
                            >
                              Edit Hotel
                            </Button>
                          </A>
                        </div>
                        <Confirm
                          handleConfirm={handleConfirm}
                          cancelDialog={"Cancel"}
                          confirmDialog={"Delete"}
                          buttonText={"Delete"}
                          id={value.id}
                          sentence={`You are about to delete hotel ${value.name} ?`}
                        />
                        <div className="ml-1">
                          <A className="" href={`/hotel/${value.id}/reviews`}>
                            <RateReviewIcon color="action" fontSize="large" />
                          </A>
                        </div>
                      </div>
                      <div className="w-1/3 flex flex-row text-right">
                        <div className="w-1/5 md:w-1/4 lg:w-1/4"></div>
                        <div className="w-full md:w-3/4 lg:w-3/4">
                          <StatusIndicator status={value.approved} />
                        </div>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              )
            );
          })}
        </Grid>
      )}
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default DashboardPage;
