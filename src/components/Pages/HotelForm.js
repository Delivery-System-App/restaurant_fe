import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Uploader from "./UploadImage";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

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
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.form}>
      <Typography variant="h6" gutterBottom>
        {type} Hotel Details
      </Typography>
      <form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
              clear={Form.photos}
              formLoading={false}
            />
            {Helper}
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
      </form>
    </Card>
  );
};

export default HotelForm;
