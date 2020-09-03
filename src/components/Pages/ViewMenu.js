import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewMenu, deleteMenu, updateMenu } from "../../redux/apiActions";
import { A } from "hookrouter";
import Confirm from "./ConfirmPage";
import Loader from "../../utils/Loader";
import BackButton from "../buttons/BackButton";
import useHeading from "./useHeading";
import {
  Grid,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
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

const FormDialog = ({ open, handleClose, handleEditName, data }) => {
  const [form, setform] = useState(data.name);
  const [err, seterr] = useState("");
  useEffect(() => {
    let mount = true;
    if (mount) setform(data.name);
    return () => {
      mount = false;
    };
  }, [data.name, handleClose]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The name of menu {data.name} will be changed
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          value={form}
          error={err}
          helperText={err}
          onChange={(e) => {
            seterr("");
            setform(e.target.value);
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (form.replace(/\s/g, "").length) handleEditName(data.id, form);
            else {
              seterr("This field is required");
            }
          }}
          color="primary"
        >
          Change Name
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ViewMenu = ({ id }) => {
  useHeading("Menu");
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [reRender, setreRender] = useState(Math.random());
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [select, setselect] = useState({ id: "", name: "" });
  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(viewMenu([id])).then((res) => {
        if (res && res.data) {
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
    //eslint-disable-next-line
  }, [dispatch, reRender]);

  const handleClickOpen = (menuId, menuName) => {
    setselect({ id: menuId, name: menuName });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditName = (id, name) => {
    setOpen(false);
    setLoading(true);
    dispatch(updateMenu({ menuId: id, name: name })).then((res) => {
      if (res) {
        if (res.data.success) {
          setnotify({ msg: "Updated Menu name", type: "success", popup: true });
          setreRender(Math.random());
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  };
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
      <BackButton />
      {Loading ? (
        <Loader />
      ) : (
        <div>
          <FormDialog
            handleEditName={handleEditName}
            data={select}
            open={open}
            handleClose={handleClose}
          />
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
                          <Button
                            size="small"
                            color="primary"
                            style={{ outline: "none" }}
                            onClick={() =>
                              handleClickOpen(value.id, value.name)
                            }
                          >
                            Edit Name
                          </Button>
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
