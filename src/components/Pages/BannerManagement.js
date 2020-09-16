import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBanner, getHotel } from "../../redux/apiActions";
import BackButton from "../buttons/BackButton";
import useHeading from "./useHeading";
import CircularProgress from "@material-ui/core/CircularProgress";
import Carousal from "./Carousal";
import Loader from "../../utils/Loader";
import Confirm from "./ConfirmBanner";
import {
  Grid,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Notify from "../../utils/Notify";
import Uploader from "./UploadImage";
import { imageUploader } from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    maxWidth: 345,
    marginTop: 15,
    margin: "0px auto",
  },
  media: {
    height: 180,
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
  container: {
    marginTop: "20px",
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: "relative",
  },
  cancel: {
    marginTop: 8,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  card: {
    marginTop: 10,
    width: "100%",
    padding: 5,
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
        onClick={handleSubmit}
        fullwidth
        className={classes.submit}
        style={{ outline: "none" }}
      >
        Submit
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
const FormDialog = ({
  open,
  loading,
  handleClose,
  setFiles,
  images,
  imageCleared,
  handleSubmit,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload Banner Images</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding new banners will remove previous ones
          </DialogContentText>
          <Uploader
            setFiles={setFiles}
            clearImage={images}
            imageCleared={imageCleared}
            formLoading={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.cancel}
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{ outline: "none" }}
          >
            Cancel
          </Button>
          <LoaderButton handleSubmit={handleSubmit} Loading={loading} />
        </DialogActions>
      </Dialog>
    </div>
  );
};
const BannerManagement = ({ resid }) => {
  useHeading("Banner");
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const [images, setimages] = useState([]);
  const [loading, setloading] = useState(false);
  const [banner, setbanner] = useState(null);
  const [rerender, setrerender] = useState(false);
  const [bannerOpen, setbannerOpen] = useState(false);
  const [form, setform] = useState("");
  const dispatch = useDispatch();
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  useEffect(() => {
    setloading(true);
    let mount = true;

    if (mount) {
      dispatch(getHotel([resid])).then((res) => {
        if (res) {
          if (res.data.banner) {
            const bannerData = res.data.banner;
            let newbanner = [];
            for (let i = 0; i < bannerData.length; i++) {
              newbanner = newbanner.concat(bannerData[i].banner);
            }
            setbanner(newbanner);
          }
        }
        setloading(false);
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch, resid, rerender]);
  const handleClose = () => {
    setopen(false);
  };
  const setFiles = (files) => {
    setimages(files);
  };
  const imageCleared = () => {
    setimages("CLEARED");
  };
  const finalSubmit = (secureLinkArray) => {
    if (secureLinkArray.length > 0) {
      setloading(true);
      dispatch(addBanner([resid], { banner: secureLinkArray })).then((res) => {
        if (res) {
          setloading(false);
          setimages("CLEARED");
          setopen(false);
          setrerender(Math.random());
          setnotify({ msg: "Banner updated", popup: true, type: "success" });
        }
        setloading(false);
      });
    } else {
      setloading(false);
      setimages("CLEARALL");
      setopen(false);
    }
  };
  const handleSubmit = () => {
    if (images.length > 0) {
      if (images[0].length !== 0) {
        setloading(true);
        imageUploader(images, finalSubmit);
      }
    }
  };
  const closeAlert = () => {
    setnotify({ popup: false });
  };
  const bannerDelete = (id) => {
    setbannerOpen(true);
    let newBanner = [];
    if (banner.length === 1) {
      newBanner = [null];
    } else
      for (let i = 0; i < banner.length; i++) {
        if (i !== id) {
          newBanner = newBanner.concat(banner[i]);
        }
      }
    setform(newBanner);
  };
  const bannerProps = {
    view: true,
    deleteFunction: bannerDelete,
  };
  return (
    <>
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Confirm
            open={bannerOpen}
            form={form}
            handleClose={() => setbannerOpen(false)}
            handleSubmit={(e) => {
              setbannerOpen(false);
              finalSubmit(e);
            }}
          />
          <FormDialog
            loading={loading}
            setFiles={setFiles}
            open={open}
            handleClose={handleClose}
            images={images}
            imageCleared={imageCleared}
            handleSubmit={handleSubmit}
          />
          <Grid className={classes.root} spacing={3}>
            <Grid>
              <Button
                onClick={() => setopen(true)}
                color="primary"
                variant="contained"
                style={{ outline: "none", marginRight: 5 }}
              >
                Add/Edit banner
              </Button>
            </Grid>
            <Grid className={classes.card}>
              {banner && banner[0] !== null && (
                <Card className={classes.card}>
                  <Carousal
                    props={bannerProps}
                    images={banner && banner[0] !== null ? banner : "noImage"}
                  />
                </Card>
              )}
            </Grid>
          </Grid>
          <Notify props={notify} closeAlert={closeAlert} />
        </div>
      )}
    </>
  );
};

export default BannerManagement;
