import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewMenu, deleteMenu } from "../../redux/apiActions";
import { A } from "hookrouter";
import Confirm from "./ConfirmPage";
import Loader from "../../utils/Loader";
import BackButton from "../buttons/BackButton";
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
import Notify from "../../utils/Notify";
import Addbutton from "../buttons/AddButton";
import SearchBar from "../SearchBar/SearchBar";

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
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [reRender, setreRender] = useState(Math.random());
  const [filter, setFilter] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(viewMenu([id])).then((res) => {
        if (res.data) {
          const len = res.data.data;
          setData(Object.values(len));
          setLoading(false);
        } else {
          setData([]);
          setLoading(false);
        }
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch, reRender]);

  const handleConfirm = (e) => {
    setLoading(true);
    dispatch(deleteMenu([e])).then((res) => {
      if (res.status === 200) {
        setnotify({
          msg: "Menu Deleted",
          type: "success",
          popup: true,
        });
        setreRender(Math.random());
      }
    });
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div>
          <BackButton />
          <Grid
            item
            container
            justify="center"
            style={{ marginBottom: "20px" }}
          >
            <div className="flex">
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                style={{ outline: "none", marginRight: "1px" }}
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
              <div className="ml-1">
                <Addbutton
                  title="View booking"
                  href={`/hotel/${id}/bookings`}
                />
              </div>
            </div>
            <SearchBar searchChange={handleSearchChange} />
            <Grid container className={classes.container}>
              {Data.map((value) => {
                return (
                  value.name.toLowerCase().includes(filter.toLowerCase()) && (
                    <Grid key={value.id} item xs={12} md={6} lg={4}>
                      <Card className={classes.root}>
                        <A href={`/hotel/${id}/${value.id}/${value.name}`}>
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
                          <A href={`/hotel/${id}/${value.id}/${value.name}`}>
                            <Button
                              size="small"
                              color="primary"
                              style={{ outline: "none" }}
                            >
                              View Menu
                            </Button>
                          </A>
                          <Confirm
                            handleConfirm={handleConfirm}
                            cancelDialog={"Cancel"}
                            confirmDialog={"Delete"}
                            buttonText={"Delete"}
                            id={value.id}
                            sentence={`You are about to delete the full menu list ${value.name} ?`}
                          />
                        </CardActions>
                      </Card>
                    </Grid>
                  )
                );
              })}
            </Grid>
          </Grid>
        </div>
      )}
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default ViewMenu;
