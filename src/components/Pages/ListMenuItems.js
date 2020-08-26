import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import Confirm from "./ConfirmPage";
import { useDispatch } from "react-redux";
import { menuItems } from "../../redux/apiActions";
import Loader from "../../utils/Loader";

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

const ListMenuItems = ({ id }) => {
  //getting menuid as props
  const classes = useStyles();
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(menuItems([id])).then((res) => {
        const len = res.data.data;
        console.log(len);
        setData(Object.values(len));
        setLoading(false);
      });
    }
    return () => {
      mount = false;
    };
  }, [id, dispatch]);

  const noImage = require("../../assets/images/noimage.jpg");
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
                  <CardActionArea>
                    <CardMedia
                      objectFit="contain"
                      className={classes.media}
                      image={!value.photo ? noImage : value.photo}
                      title="Contemplative Reptile"
                    />
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
                  </CardActionArea>
                  {/* </A> */}
                  <CardActions>
                    {/* <A href={`/edithotel/${value.id}`}> */}
                    <Button
                      size="small"
                      color="primary"
                      style={{ outline: "none" }}
                    >
                      Edit Item
                    </Button>
                    {/* </A> */}
                    <Confirm
                      handleConfirm={() => {
                        console.log("ok");
                      }}
                      cancelDialog={"Cancel"}
                      confirmDialog={"Delete"}
                      buttonText={"Delete"}
                      id={value.id}
                      sentence={`You are about to delete the item ${value.name} ?`}
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

export default ListMenuItems;
