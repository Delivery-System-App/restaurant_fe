import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import Confirm from "./ConfirmPage";
import BackButton from "../buttons/BackButton";
import StatusIndicator from "./StatusIndicator";
import { useDispatch } from "react-redux";
import { menuItems, deleteDish } from "../../redux/apiActions";
import Loader from "../../utils/Loader";
import { A } from "hookrouter";
import Carousal from "./Carousal";
import Notify from "../../utils/Notify";
import SearchBar from "../SearchBar/SearchBar";
import useHeading from "./useHeading";

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
    marginTop: "10px",
  },
  form: {
    width: "100%",
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

const ListMenuItems = ({ resid, id, menuname, usertype }) => {
  //getting menuid as props
  useHeading("Dishes");
  const body = {
    resId: resid,
    menuId: id,
  };
  const classes = useStyles();
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
      dispatch(menuItems([id])).then((res) => {
        if (res) {
          if (res.data.data[0] != null) {
            const len = res.data.data;
            setData(Object.values(len));
            setLoading(false);
          } else {
            setData([]);
            setLoading(false);
          }
        }
      });
    }
    return () => {
      mount = false;
    };
    //eslint-disable-next-line
  }, [reRender, dispatch]);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleConfirm = (e) => {
    body["dishId"] = e;
    if (usertype === "owner") {
      setLoading(true);
      dispatch(deleteDish(body)).then((res) => {
        if (res.status === 201) {
          setnotify({
            msg: "Dish Deleted",
            type: "success",
            popup: true,
          });
          setreRender(Math.random());
        }
        setLoading(false);
      });
    }
  };

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  const noImage = require("../../assets/images/noimage.jpg");

  return (
    <>
      <BackButton />
      {usertype === "owner" && (
        <Grid item container justify="center" style={{ marginBottom: "5px" }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ outline: "none" }}
          >
            <A
              href={`/${resid}/addmenudishes/${menuname}/${id}`}
              className={classes.link}
              style={{
                color: "#757de8",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Add Dishes To The Menu
            </A>
          </Button>
        </Grid>
      )}
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
                    {/* <A href={`/hotel/${value.id}`}> */}
                    <CardMedia
                      objectFit="contain"
                      className={classes.media}
                      title="Hotel Image"
                    >
                      <Carousal
                        images={value.photos ? value.photos : noImage}
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {value.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Price:{value.price}
                      </Typography>
                      {value.status ? (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {value.status}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          className="text-transparent"
                          component="p"
                        >
                          NULL
                        </Typography>
                      )}
                    </CardContent>
                    {/* </A> */}
                    <CardActions>
                      {usertype === "owner" && (
                        <div className="flex w-2/3 flex-row">
                          <div className="mr-2">
                            <A
                              href={`/editdish/${resid}/${id}/${value.dishId}`}
                            >
                              <Button
                                size="small"
                                color="primary"
                                style={{ outline: "none" }}
                              >
                                Edit Item
                              </Button>
                            </A>
                          </div>
                          <Confirm
                            handleConfirm={handleConfirm}
                            cancelDialog={"Cancel"}
                            confirmDialog={"Delete"}
                            buttonText={"Delete"}
                            id={value.dishId}
                            sentence={`You are about to delete the item ${value.name} ?`}
                          />
                        </div>
                      )}
                      <div className="w-1/3 flex flex-row text-right">
                        {usertype === "owner" && (
                          <div className="w-1/5 md:w-1/4 lg:w-1/4"></div>
                        )}
                        <div className="w-4/5 md:w-3/4 lg:w-3/4">
                          <StatusIndicator status={value.category} />
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

export default ListMenuItems;
