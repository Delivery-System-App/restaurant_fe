import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  InputAdornment,
  CircularProgress,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Uploader from "./UploadImage";
import { addMoreDish } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import Notify from "../../utils/Notify";
import useHeading from "./useHeading";
import { imageUploader } from "../../utils/helper";
import BackButton from "../buttons/BackButton";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "500px",
    margin: "0px auto",
    padding: "20px 30px 20px 30px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",

    marginTop: -5,
    marginLeft: -1,
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
        fullWidth
        onClick={handleSubmit}
        fullwidth
        className={classes.submit}
        style={{ outline: "none" }}
      >
        {type}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const AddDishToMenu = ({ menuname, resid, menuid }) => {
  useHeading("Add Dishes");
  const classes = useStyles();
  const dispatch = useDispatch();
  const Initform = {
    photos: "",
    price: "",
    name: "",
    category: "EMPTY",
  };
  const initError = {
    photos: "",
    price: "",
    name: "",
    category: false,
  };
  const [previousDishes, setPreviousDishes] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setMenuName(menuname);
    //eslint-disable-next-line
  }, []);

  const setDishes = (secureUrl) => {
    if (secureUrl) {
      const Result = {
        ...Form,
        photos: secureUrl,
      };
      setPreviousDishes([...previousDishes, { ...Result }]);
      setLoading(false);
      setForm(Initform);
      setImage("CLEARALL");
    } else {
      setPreviousDishes([...previousDishes, { ...Form }]);
      setnotify({
        msg: "Added dish",
        type: "success",
        popup: true,
      });
      setForm(Initform);
      setLoading(false);
    }
  };
  const imageCleared = () => {
    setImage("CLEARED");
  };
  const addDishes = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      if (image) {
        setLoading(true);
        uploadPhoto();
      } else {
        setDishes("");
      }
    }
  };

  const setFiles = (files) => {
    setImage(files);
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
    err["category"] = false;

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "" && !optionalValues.includes(key)) {
        formValid = false;
        err[key] = "This field is required";
      }
      if (key === "category") {
        if (Form[key] === "EMPTY") {
          err[key] = true;
          formValid = false;
        }
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
  const handleConfirm = () => {
    if (image && validateForm()) {
      setLoading(true);
      imageUploader(image, handleSubmit);
    } else {
      handleSubmit("NULL");
    }
  };
  const handleSubmit = (URL) => {
    if (
      validateForm() ||
      (previousDishes.length !== 0 && Form.name === "" && Form.price === "")
    ) {
      setLoading(true);
      let Dish;
      if (validateForm()) {
        let Result;
        if (URL !== "NULL") {
          Result = {
            ...Form,
            photos: URL,
          };
        } else {
          Result = { ...Form, photos: "" };
        }
        Dish = [...previousDishes, { ...Result }];
      } else {
        Dish = [...previousDishes];
      }
      setPreviousDishes([]);
      setError(initError);
      const Result = {
        menuId: menuid,
        resId: resid,
        dish: Dish,
      };

      dispatch(addMoreDish(Result)).then((res) => {
        if (res) {
          if (res.status === 200) {
            setnotify({
              msg: `Added dishes to ${menuname}`,
              type: "success",
              popup: true,
            });
          }
          setForm(Initform);
          setImage("CLEARALL");
          setMenuName("");
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

  const uploadPhoto = () => {
    imageUploader(image, setDishes);
    //setDishes(uploadImage(image));
  };

  return (
    <>
      <BackButton />
      <Card className={classes.form}>
        <Typography variant="h6" gutterBottom>
          Add Dishes To The Menu
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography style={{ fontSize: "12px" }}>
                Cant change Menu name
              </Typography>
              <TextField
                id="menuname"
                name="menuname"
                value={menuName}
                label="Menu name"
                fullWidth
                disabled
                autoComplete="menuName"
                error={Error["menuName"]}
                helperText={Error["menuName"]}
              />
            </Grid>
            <Grid item xs={12}>
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
              <FormControl className={""} error={Error["category"]}>
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
                {Error["category"] ? (
                  <FormHelperText>Select an option</FormHelperText>
                ) : (
                  <FormHelperText>Veg/Non veg</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Uploader
                setFiles={setFiles}
                imageCleared={imageCleared}
                formLoading={false}
                clearImage={image}
              />
            </Grid>
            <Grid item xs={12}>
              {/*} <Button
                onClick={addDishes}
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.submit}
              >
                Add More Dishes 
              </Button>*/}
              <div className="text-center">
                <LoaderButton
                  type={"Add Menu"}
                  handleSubmit={addDishes}
                  Loading={Loading}
                />
              </div>
              <Button
                style={{ outline: "none" }}
                onClick={handleConfirm}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit Menu
              </Button>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </form>
      </Card>
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default AddDishToMenu;
