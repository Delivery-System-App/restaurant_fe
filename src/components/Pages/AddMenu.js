import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Uploader from "./UploadImage";
import { addDish } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import Notify from "../../utils/Notify";
import useHeading from "./useHeading";

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
const AddMenu = ({ id }) => {
  useHeading("Add Menu");
  const classes = useStyles();
  const dispatch = useDispatch();
  const Initform = {
    name: "",
    photos: "",
    price: "",
    dishname: "",
  };
  const initError = {
    name: "",
    photos: "",
    price: "",
    dishname: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });

  const setFiles = (files) => {
    setForm({ ...Form, photos: files });
  };
  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const optionalValues = ["photos"];
  const validateForm = () => {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "" && !optionalValues.includes(key)) {
        formValid = false;
        err[key] = "This field is required";
      }
      if (key === "price") {
        if (isNaN(Form[key])) {
          err[key] = "Enter a Number";
          formValid = false;
        }
      }
    });
    setError(err);
    return formValid;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      const Result = {
        name: Form.name,
        dish: {
          name: Form.dishname,
          photos: Form.photos,
          price: Form.price,
        },
      };

      console.log(Result);
      dispatch(addDish([id], Result)).then((res) => {
        console.log(res);
        if (res) {
          if (res.status === 201) {
            setnotify({
              msg: "Added dish",
              type: "success",
              popup: true,
            });
          }
          setForm(Initform);
        }
      });
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  return (
    <>
      <Card className={classes.form}>
        <Typography variant="h6" gutterBottom>
          Add Menu
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
                label="Menu name"
                fullWidth
                autoComplete="name"
                error={Error["name"]}
                helperText={Error["name"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="dishname"
                name="dishname"
                onChange={handleChange}
                label="Dish name"
                value={Form.dishname}
                fullWidth
                autoComplete="dishname"
                error={Error["dishname"]}
                helperText={Error["dishname"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                type="text"
                id="price"
                name="price"
                value={Form.price}
                onChange={handleChange}
                error={Error["price"]}
                helperText={Error["price"]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Uploader setFiles={setFiles} formLoading={false} />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default AddMenu;
