import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { A } from "hookrouter";
import { register } from "../../redux/apiactions";
import { useDispatch } from "react-redux";
import { validateEmailAddress, validatePassword } from "../../utils/validation";

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
}));

const Register = () => {
  const dispatch = useDispatch();
  const initForm = {
    email: "",
    password: "",
    number: "",
    name: "",
    confirm: "",
    type: "owner",
    location: "",
  };
  const initError = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(initError);

  function changeHandler(e) {
    const { name, value } = e.target;
    setError(initError);
    setForm({ ...form, [name]: value });
  }

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { password, confirm, email } = form;
    Object.keys(form).forEach((key) => {
      if (form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    if (password !== confirm) {
      err["confirm"] = "Passwords do not match";
      formValid = false;
    }
    if (!validateEmailAddress(email)) {
      err["email"] = "Enter a valid email";
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

    setError(err);
    return formValid;
  }

  function submitHandler(e) {
    e.preventDefault();
    if (validInputs()) {
      dispatch(register(form)).then((res) => {
        console.log(res);
      });
      setForm(initForm);
    }
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={changeHandler}
                autoComplete="fname"
                name="name"
                variant="outlined"
                value={form.name}
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={changeHandler}
                variant="outlined"
                value={form.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={changeHandler}
                autoComplete="number"
                name="number"
                variant="outlined"
                value={form.number}
                required
                fullWidth
                id="number"
                label="Mobile No"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={changeHandler}
                autoComplete="location"
                name="location"
                variant="outlined"
                value={form.location}
                required
                fullWidth
                id="location"
                label="Location"
              />
            </Grid>
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
                error={error["password"]}
                helperText={error["password"]}
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
                error={error["confirm"]}
                helperText={error["confirm"]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <A href="/login" className={classes.link}>
                <Link component="button" variant="body2">
                  Already have an account? Sign in
                </Link>
              </A>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
