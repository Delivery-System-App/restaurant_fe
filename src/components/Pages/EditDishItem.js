import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../utils/Loader";
import Notify from "../../utils/Notify";
import { menuItems, updateDish } from "../../redux/apiActions";
import Uploader from "./UploadImage";
import { imageUploader } from "../../utils/helper";
import BackButton from "../buttons/BackButton";
import useHeading from "./useHeading";
import Select from "@material-ui/core/Select";

import {
  makeStyles,
  Card,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "500px",
    margin: "0px auto",
    padding: "20px 30px 20px 30px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditDishItem({ dishid, menuid, resid }) {
  useHeading("Edit Dish");
  const dispatch = useDispatch();
  const classes = useStyles();
  const initError = {
    name: "",
    price: "",
    photos: "",
    status: "",
    category: "EMPTY",
    discount: "",
  };
  let initForm = {
    name: "",
    price: "",
    photos: "",
    status: "",
    category: false,
    discount: "",
  };
  const [Error, setError] = useState(initError);
  const [Form, setForm] = useState(initForm);
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [image, setImage] = useState("");
  useEffect(() => {
    setLoading(true);
    let mount = true;
    if (mount) {
      dispatch(menuItems([menuid])).then((res) => {
        if (res) {
          const len = res.data.data;
          const Resp = Object.values(len);
          const result = Resp.filter((obj) => obj.dishId === dishid);
          let { name, price, photos, status, category, discount } = result[0];
          if (isNaN(discount)) {
            discount = 0;
          }
          setForm({ name, price, photos, status, category, discount });
        }
        setLoading(false);
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch, dishid, menuid]);
  const setFiles = (files) => {
    setImage(files);
  };
  const handleChange = (e) => {
    setnotify({
      popup: false,
    });
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const optionalValues = ["photos", "discount"];
  const validInputs = () => {
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
      if (key === "discount" && Form[key] === "") {
        Form[key] = 0;
      }
      if (key === "discount") {
        if (isNaN(Form[key])) {
          err[key] = "Enter a Number";
          formValid = false;
        }
      }
    });
    setError(err);
    return formValid;
  };
  const handleSubmit = (secureUrl) => {
    if (validInputs()) {
      setLoading(true);
      let Result;
      if (secureUrl !== "") {
        Result = {
          ...Form,
          photos: secureUrl,
        };
      } else {
        Result = {
          ...Form,
        };
      }
      /* let formData = new FormData();
      Object.keys(Form).forEach((key) => {
        if (key === "photos" && Form[key] !== "") {
          //needs to be done
          // Form[key].forEach((el) => {
          //   formData.append(key, el);
          // });
          formData.append(key, Form[key]);
        } else {
          formData.append(key, Form[key]);
        }
      });*/

      dispatch(
        updateDish({
          resId: resid,
          menuId: menuid,
          dishId: dishid,
          ...Result,
        })
      ).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setnotify({
            msg: "Dish updated",
            type: "success",
            popup: true,
          });
        }
        setLoading(false);
      });
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  const uploadImage = () => {
    if (validInputs()) {
      setLoading(true);
      imageUploader(image, handleSubmit);
    }
  };
  return (
    <>
      <BackButton />
      {Loading ? (
        <Loader />
      ) : (
        <>
          <Notify props={notify} closeAlert={closeAlert} />
          <Card className={classes.form}>
            <Typography variant="h6" gutterBottom>
              Update Dish Item
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    onChange={handleChange}
                    label="Dish name"
                    value={Form.name}
                    fullWidth
                    autoComplete="name"
                    error={Error["name"]}
                    helperText={Error["name"]}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="status"
                      value={Form.status}
                      onChange={handleChange}
                    >
                      <MenuItem value={"AVAILABLE"}>AVAILABLE</MenuItem>
                      <MenuItem value={"NOT AVAILABLE"}>NOT AVAILABLE</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Discount %"
                    type="discount"
                    id="discount"
                    name="discount"
                    value={Form.discount}
                    onChange={handleChange}
                    error={Error["discount"]}
                    helperText={Error["doscount"]}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel style={{ minWidth: "80px" }}>
                      Select type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Form.category}
                      name="category"
                      onChange={handleChange}
                    >
                      <MenuItem value={""} disabled>
                        Select type
                      </MenuItem>
                      <MenuItem value={"VEG"}>VEG</MenuItem>
                      <MenuItem value={"NONVEG"}>NON VEG</MenuItem>
                    </Select>
                    <FormHelperText>Veg/Non veg</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Uploader setFiles={setFiles} formLoading={false} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={uploadImage}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{ outline: "none" }}
                  >
                    Update Dish
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </>
      )}
    </>
  );
}

export default EditDishItem;
