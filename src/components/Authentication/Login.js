import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { A, navigate, useQueryParams } from "hookrouter";
import { login } from "../../redux/apiactions";
import { useDispatch } from "react-redux";
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
}));

function Login() {
  const dispatch = useDispatch();
  const initForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initForm);
  const [queryParams, setQueryParams] = useQueryParams();
  useEffect(() => {
    setQueryParams(queryParams);
  }, []);
  function changeHandler(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(form);
    dispatch(login(form)).then((resp) => {
      console.log(resp);
      const { data: res } = resp;
      const { status: statusCode } = resp;

      // set captha logic needed

      // TODO: change status code to 200 (backend was sending 201 on login)
      if (res && statusCode === 201) {
        localStorage.setItem("access_token", res.access_token);
        if (queryParams && queryParams.redirect) {
          navigate("/");
        } else {
          //     navigate("/");
        }
        window.location.reload();
      }
    });
    // localStorage.setItem(`${process.env.REACT_APP_NAME}_token`, "yay man");
    // navigate("/");
    //   window.location.reload();
  }
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            onChange={changeHandler}
            value={form.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={changeHandler}
            value={form.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <A href="/register" className={classes.link}>
                <Link variant="body2" component="button">
                  Don't have an account? Sign Up
                </Link>
              </A>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
