import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  Button,
  TextField,
  CircularProgress,
  Link,
  Grid,
  CssBaseline,
  Typography,
  Container,
} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import GoogleLogin from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";
import { A, useQueryParams, navigate } from "hookrouter";
import { login } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import { validateEmailAddress } from "../../utils/validation";
import Notify from "../../utils/Notify";
const splitterString = "%=%@~!lorem^ipsum^split~@%//+%";

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
  wrapper: {
    position: "relative",
  },
  login: {
    marginTop: 5,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -5,
    marginLeft: -1,
  },
}));

const LoaderButton = ({ Loading, handleSubmit }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      if (!Loading) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
    return () => {
      mount = false;
    };
  }, [Loading]);

  return (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
        onClick={handleSubmit}
        fullwidth
        className={classes.submit}
        style={{ outline: "none" }}
      >
        Login
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const initForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initForm);
  const [queryParams, setQueryParams] = useQueryParams();
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setQueryParams(queryParams);
    //eslint-disable-next-line
  }, []);
  function changeHandler(e) {
    const { name, value } = e.target;
    const fieldValue = { ...form };
    fieldValue[name] = name === "email" ? value.toLowerCase() : value;
    setForm(fieldValue);
  }
  const fresponseGoogle = (response) => {
    setnotify({ msg: "Login failed", popup: true, type: "error" });
  };

  const responseGoogle = (response) => {
    setloading(true);
    const body = {
      email: "GOOGLE_AUTH" + splitterString + response.tokenObj.id_token,
      password: "owner",
    };
    dispatch(login(body)).then((res) => {
      if (res.data) {
        localStorage.setItem("access_token", res.data.access_token);
        setloading(false);
        window.location.reload();
      }
      setloading(false);
    });
  };

  function submitHandler(e) {
    e.preventDefault();
    const { email, password } = form;
    if (validateEmailAddress(email)) {
      setloading(true);
      const resultForm = {
        email: "EMAIL_AUTH" + splitterString + email + splitterString + "owner",
        password: password,
      };
      dispatch(login(resultForm)).then((resp) => {
        if (resp) {
          const { data: res } = resp;
          const { status: statusCode } = resp;
          if (resp.data === undefined) {
            setloading(false);
            setnotify({
              msg: "Invalid credentials",
              type: "error",
              popup: !notify.popup,
            });
          }
          if (res && statusCode === 201) {
            localStorage.setItem("access_token", res.access_token);
            setloading(false);
            window.location.reload();
          }
        } else {
          setloading(false);
        }
      });
    } else {
      setnotify({
        msg: "invalid email",
        type: "error",
        popup: true,
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login to SKOSH
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
              onKeyPress={(event) => {
                if (event.charCode === 13) {
                  submitHandler(event);
                  navigate("/");
                }
              }}
              autoComplete="current-password"
            />
            <LoaderButton Loading={loading} handleSubmit={submitHandler} />
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
          <Typography style={{ marginTop: 2, marginBottom: 1, fontSize: 16 }}>
            OR
          </Typography>
          <Button color="primary" className={classes.login} size="small">
            <GoogleLogin
              style={{ backgroundColor: "inherit" }}
              clientId="851553848714-023jl52skl877gsrkabla89chm0sscgu.apps.googleusercontent.com"
              buttonText="Sign In"
              onSuccess={responseGoogle}
              onFailure={fresponseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Button>
        </div>
      </Container>
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default Login;
