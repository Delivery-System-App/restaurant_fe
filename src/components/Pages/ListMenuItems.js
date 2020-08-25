import React from "react";
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

const ListMenuItems = ({ id }) => {
  //getting menuid as props
  const classes = useStyles();
  //need to get data from the api once done
  const Data = [
    {
      name: "Masala Dosa",
      photo:
        "https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2017/11/paper-masala-dosa-0.jpg",
      price: 50,
    },
    {
      name: "Masala Dosa",
      photo:
        "https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2017/11/paper-masala-dosa-0.jpg",
      price: 100,
    },
    {
      name: "Masala Dosa",
      photo:
        "https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2017/11/paper-masala-dosa-0.jpg",
      price: 500,
    },
  ];
  return (
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
                  image={value.photo}
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
  );
};

export default ListMenuItems;
