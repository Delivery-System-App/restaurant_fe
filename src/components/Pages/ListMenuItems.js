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
import { useDispatch } from "react-redux";
import { menuItems, deleteDish } from "../../redux/apiActions";
import Loader from "../../utils/Loader";
import { A } from "hookrouter";
import Carousal from "./Carousal";
import Notify from "../../utils/Notify";

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

const ListMenuItems = ({ resid, id }) => {
  //getting menuid as props
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
  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(menuItems([id])).then((res) => {
        const len = res.data.data;
        setData(Object.values(len));
        setLoading(false);
      });
    }
    return () => {
      mount = false;
    };
  }, [reRender, dispatch]);

  const handleConfirm = (e) => {
    body["dishId"] = e;
    console.log(body);
    setLoading(true);
    //not working
    dispatch(deleteDish(body)).then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        setnotify({
          msg: "Dish Deleted",
          type: "success",
          popup: true,
        });
        setreRender(Math.random());
      }
      setLoading(false);
    });
  };

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  const noImage = require("../../assets/images/noimage.jpg");
  const Images = [
    "https://us.123rf.com/450wm/indianfoodimages/indianfoodimages1808/indianfoodimages180800087/106450537-group-of-south-indian-food-like-masala-dosa-uttapam-idli-idly-wada-vada-sambar-appam-semolina-halwa-.jpg?ver=6",
    noImage,
  ];

  console.log(Data);
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <Grid container className={classes.container}>
          {Data.map((value, index) => {
            return (
              <Grid key={index + 1} item xs={12} md={6} lg={4}>
                <Card className={classes.root}>
                  {/* <A href={`/hotel/${value.id}`}> */}
                  <CardMedia
                    objectFit="contain"
                    className={classes.media}
                    title="Hotel Image"
                  >
                    <Carousal images={value.photos ? [value.photos] : Images} />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {value.dishname}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Price:{value.price}
                    </Typography>
                  </CardContent>
                  {/* </A> */}
                  <CardActions>
                    <A href={`/editdish/${resid}/${id}/${value.dishId}`}>
                      <Button
                        size="small"
                        color="primary"
                        style={{ outline: "none" }}
                      >
                        Edit Item
                      </Button>
                    </A>
                    <Confirm
                      handleConfirm={handleConfirm}
                      cancelDialog={"Cancel"}
                      confirmDialog={"Delete"}
                      buttonText={"Delete"}
                      id={value.dishId}
                      sentence={`You are about to delete the item ${value.dishname} ?`}
                    />
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default ListMenuItems;
