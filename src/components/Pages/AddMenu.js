import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button, InputAdornment, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Uploader from "./UploadImage";
import { addDish } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import Notify from "../../utils/Notify";
import useHeading from "./useHeading";
import { imageUploader } from "../../utils/helper";
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
      >
        {type}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const AddMenu = ({ id }) => {
  useHeading("Add Menu");
  const classes = useStyles();
  const dispatch = useDispatch();
  const Initform = {
    photos: "",
    price: "",
    name: "",
  };
  const initError = {
    photos: "",
    price: "",
    name: "",
  };
  const [previousDishes, setPreviousDishes] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);

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
      setForm(Initform);
      setLoading(false);
    }
    setnotify({
      msg: "Added dish",
      type: "success",
      popup: true,
    });
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
    // setForm({ ...Form, photos: files });
    setImage(files);
  };
  const handleMenuName = (e) => {
    const { value } = e.target;
    setMenuName(value);
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
    if (menuName === "") {
      err["name"] = "This field is required";
      formValid = false;
    }

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

  const handleConfirm = () => {
    if (validateForm()) {
      setLoading(true);
      if (image) {
        imageUploader(image, handleSubmit);
      } else {
        handleSubmit("");
      }
    } else {
      handleSubmit("");
    }
  };

  const handleSubmit = (secureUrl) => {
    if (
      validateForm() ||
      (previousDishes.length !== 0 && Form.name === "" && Form.price === "")
    ) {
      let Dish;
      if (validateForm()) {
        const Result = {
          ...Form,
          photos: secureUrl,
        };
        Dish = [...previousDishes, { ...Result }];
      } else {
        Dish = [...previousDishes];
      }
      console.log(Form, Dish);
      setPreviousDishes([]);
      setError(initError);
      const Result = {
        name: menuName,
        dish: Dish,
      };

      dispatch(addDish([id], Result)).then((res) => {
        if (res) {
          if (res.status === 201) {
            setnotify({
              msg: "Added menu",
              type: "success",
              popup: true,
            });
          }
          setForm(Initform);
          setLoading(false);
          setImage("CLEARALL");
          setMenuName("");
        }
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
      <Card className={classes.form}>
        <Typography variant="h6" gutterBottom>
          Add Menu
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {previousDishes.length > 0 && (
                <Typography style={{ fontSize: "12px" }}>
                  Cant change Menu name
                </Typography>
              )}
              <TextField
                required
                id="name"
                name="name"
                value={menuName}
                onChange={handleMenuName}
                label="Menu name"
                fullWidth
                disabled={previousDishes.length > 0}
                autoComplete="name"
                error={Error["name"]}
                helperText={Error["name"]}
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
              <Uploader
                setFiles={setFiles}
                imageCleared={imageCleared}
                formLoading={Loading}
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

export default AddMenu;
