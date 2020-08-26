import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewMenu } from "../../redux/apiActions";
import { A } from "hookrouter";
import Confirm from "./ConfirmPage";
import Loader from "../../utils/Loader";
import {
  Grid,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
} from "@material-ui/core";
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
    marginTop: "20px",
  },
}));

const ViewMenu = ({ id }) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(viewMenu([id])).then((res) => {
      if (res.data) {
        const len = res.data.data;
        setData(Object.values(len));
      }
      setLoading(false);
    });
  }, [id, dispatch]);
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div>
          <Grid
            item
            container
            justify="center"
            style={{ marginBottom: "20px" }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ outline: "none" }}
            >
              <A
                href={`/hotel/${id}/addmenu`}
                className={classes.link}
                style={{
                  color: "#757de8",
                  fontSize: "16px",
                  textDecoration: "none",
                }}
              >
                Add Menu
              </A>
            </Button>
            <Grid container className={classes.container}>
              {Data.map((value) => {
                return (
                  <Grid key={value.id} item xs={12} md={6} lg={4}>
                    <Card className={classes.root}>
                      <A href={`/hotel/${id}/${value.id}/listmenuitems`}>
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {value.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </A>
                      <CardActions>
                        <A href={`/hotel/${id}/${value.id}/listmenuitems`}>
                          <Button
                            size="small"
                            color="primary"
                            style={{ outline: "none" }}
                          >
                            View Menu
                          </Button>
                        </A>
                        <Confirm
                          handleConfirm={(e) => {
                            console.log(e);
                          }}
                          cancelDialog={"Cancel"}
                          confirmDialog={"Delete"}
                          buttonText={"Delete"}
                          id={value.id}
                          sentence={`You are about to delete the full menu list ${value.name} ?`}
                        />
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default ViewMenu;
