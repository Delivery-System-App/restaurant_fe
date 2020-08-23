import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Uploader from "./UploadImage";
import { phonePreg } from "../../utils/validation";
import { addHotel } from "../../redux/apiactions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "500px",
    margin: "0px auto",
    padding: "20px 30px 20px 30px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddressForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Initform = {
    name: "",
    photos: "",
    location: "",
    address: "",
    contact: "",
  };
  const initError = {
    name: "",
    photos: "",
    location: "",
    address: "",
    contact: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const setFiles = (files) => {
    setForm({ ...Form, photos: files });
  };
  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const optionalValues = ["photos"];

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { contact } = Form;

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "" && !optionalValues.includes(key)) {
        formValid = false;
        err[key] = "This field is required";
      }
    });

    if (!phonePreg(contact)) {
      formValid = false;
      err["contact"] = "Enter Valid phone number";
    }

    setError(err);
    return formValid;
  };
  const handleSubmit = () => {
    if (validInputs()) {
      let formData = new FormData();
      setForm(Initform);
      Object.keys(Form).forEach((key) => {
        if (key === "photos" && Form[key] !== "") {
          Form[key].forEach((el) => {
            formData.append(key, el);
          });
        } else {
          formData.append(key, Form[key]);
        }
      });

      dispatch(addHotel(Form)).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <Card className={classes.form}>
      <Typography variant="h6" gutterBottom>
        Add Hotel Details
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
            <Uploader setFiles={setFiles} formLoading={false} />
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
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Hotel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
