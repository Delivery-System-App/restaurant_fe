import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { updateProfile, getCurrentUser } from "../../redux/apiActions";
import { useDispatch, useSelector } from "react-redux";
import { validatePassword, phonePreg } from "../../utils/validation";
import Notify from "../../utils/Notify";
import UseHeading from "./useHeading";
import BackButton from "../buttons/BackButton";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  h5: {
    fontSize: "14px",
    marginTop: "3px",
    marginBottom: "3px",
  },
}));

const UpdateProfile = () => {
  const dispatch = useDispatch();
  UseHeading("Edit Profile");
  const state = useSelector((reduxState) => reduxState);
  const currentUser = state.newapi.currentUser.data.data;
  const initForm = {
    name: currentUser.name,
    number: currentUser.number,
    password: "",
    confirm: "",
  };
  const initError = {
    name: "",
    number: "",
    password: "",
    confirm: "",
  };

  const [form, setForm] = useState(initForm);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [Error, setError] = useState(initError);
  useEffect(() => {}, []);
  function changeHandler(e) {
    setError(initError);
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { password, confirm, number } = form;
    Object.keys(form).forEach((key) => {
      if (form[key] === "" && (key === "name" || key === "number")) {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    if (!phonePreg(number)) {
      err["number"] = "Invalid Number";
      formValid = false;
    }
    if (password !== "" || confirm !== "") {
      if (password !== confirm) {
        err["confirm"] = "Passwords do not match";
        formValid = false;
      }

      if (password.length < 8) {
        err["password"] = "Must be atleast 8 characters";
        formValid = false;
      } else if (password.length > 49) {
        err["password"] = "Maximum 49 characters";
        formValid = false;
      } else if (!validatePassword(password)) {
        err["password"] = "Needed one upper one lower and one digit";
        formValid = false;
      }
    }

    setError(err);
    return formValid;
  }

  function submitHandler(e) {
    e.preventDefault();
    if (validInputs()) {
      dispatch(updateProfile(form)).then((res) => {
        if (res) {
          if (res.data.success) {
            setnotify({
              msg: "Profile updated",
              type: "success",
              popup: true,
            });
            setTimeout(() => {
              dispatch(getCurrentUser()).then((res) => {});
            }, 2000);
          } else {
            setnotify({
              msg: "Error",
              type: "error",
              popup: true,
            });
          }
        }
      });
    }
  }
  const classes = useStyles();
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  return (
    <>
      <BackButton />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <form className={classes.form}>
            <TextField
              onChange={changeHandler}
              value={form.name}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              error={Error["name"]}
              helperText={Error["name"]}
              autoFocus
            />
            <TextField
              onChange={changeHandler}
              value={form.number}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="number"
              label="Mobile number"
              id="number"
              autoComplete="number"
              error={Error["number"]}
              helperText={Error["number"]}
            />
            <Typography className={classes.h5} variant="h5">
              Leave blank if no need to change
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="password"
                  name="password"
                  variant="outlined"
                  value={form.password}
                  required
                  type="password"
                  fullWidth
                  id="password"
                  label="Password"
                  error={Error["password"]}
                  helperText={Error["password"]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={changeHandler}
                  autoComplete="confirm"
                  name="confirm"
                  variant="outlined"
                  value={form.confirm}
                  required
                  type="password"
                  fullWidth
                  id="confirm"
                  label="Confirm Password"
                  error={Error["confirm"]}
                  helperText={Error["confirm"]}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
              style={{ outline: "none" }}
            >
              Update Profile
            </Button>
          </form>
        </div>
      </Container>
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default UpdateProfile;
