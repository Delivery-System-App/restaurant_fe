import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Switch } from "@material-ui/core";
import Uploader from "./UploadImage";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "500px",
    margin: "0px auto",
    padding: "20px 30px 20px 30px",
  },

  submit: {
    //margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: "relative",
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LoaderButton = ({ Loading, handleSubmit, type }) => {
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
        onClick={handleSubmit}
        fullwidth
        className={classes.submit}
        style={{ outline: "none" }}
      >
        {type} Hotel
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const HotelForm = ({
  handleChange,
  handleSubmit,
  Form,
  setFiles,
  Error,
  type,
  Helper,
  Loading,
  Images,
  imageCleared,
  time,
  handleTimechange,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.form}>
      <Grid container>
        <Grid item style={{ textAlign: "center" }} xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            {type} Hotel Details
          </Typography>
        </Grid>
        <Grid item style={{ textAlign: "right" }} xs={12} sm={6}>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Closed</Grid>
              <Grid item style={{ width: 45, marginRight: 3, marginLeft: 3 }}>
                <FormControlLabel
                  control={
                    <PurpleSwitch
                      checked={Form.openStatus}
                      onChange={handleChange}
                      name="openStatus"
                    />
                  }
                />
              </Grid>
              <Grid item>Open</Grid>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
      <form className={classes.form}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                value={Form.name}
                onChange={handleChange}
                label="Hotel name"
                fullWidth
                autoComplete="hotelname"
                error={Error["name"]}
                helperText={Error["name"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                value={Form.address}
                onChange={handleChange}
                label="Address"
                error={Error["address"]}
                helperText={Error["address"]}
                fullWidth
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="contact"
                name="contact"
                onChange={handleChange}
                label="Mobile Number"
                value={Form.contact}
                fullWidth
                autoComplete="number"
                error={Error["contact"]}
                helperText={Error["contact"]}
              />
            </Grid>
            <Grid item xs={12}>
              <Uploader
                setFiles={setFiles}
                clearImage={Images}
                imageCleared={imageCleared}
                formLoading={Loading}
              />
              {Helper}
            </Grid>
            <Grid item xs={12}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className="mr-0 md:mr-2 lg:mr-2">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Opening time"
                    className="mr-1"
                    error={Error["openTime"]}
                    helperText={Error["openTime"]}
                    value={time.open}
                    onChange={(e) => handleTimechange(e, "open")}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </div>
                <div className="ml-0 md:ml-2 lg:ml-2">
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Closing time"
                    className="mr-1"
                    value={time.close}
                    error={Error["closeTime"]}
                    helperText={Error["closeTime"]}
                    onChange={(e) => handleTimechange(e, "close")}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="location"
                name="location"
                label="Location"
                value={Form.location}
                fullWidth
                onChange={handleChange}
                autoComplete="Location"
                error={Error["location"]}
                helperText={Error["location"]}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="text-center">
                <LoaderButton
                  type={type}
                  handleSubmit={handleSubmit}
                  Loading={Loading}
                />
              </div>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
    </Card>
  );
};

export default HotelForm;
