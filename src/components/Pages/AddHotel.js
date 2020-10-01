import React, { useState } from "react";
import { phonePreg } from "../../utils/validation";
import { addHotel } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import HotelForm from "./HotelForm";
import Notify from "../../utils/Notify";
import useHeading from "./useHeading";
import { imageUploader } from "../../utils/helper";
import BackButton from "../buttons/BackButton";
import moment from "moment";

export default function AddHotel() {
  useHeading("Add Hotel");
  const dispatch = useDispatch();
  const Initform = {
    name: "",
    photos: "",
    location: "",
    address: "",
    contact: "",
    openStatus: true,
  };
  const initError = {
    name: "",
    photos: "",
    location: "",
    address: "",
    contact: "",
    openTime: "",
    closeTime: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [image, setImage] = useState("");
  const [time, settime] = useState({
    open: new Date("2000-08-18T08:00:00"),
    close: new Date("2000-08-18T21:00:00"),
  });
  const [Loading, setLoading] = useState(false);

  const setFiles = (files) => {
    setImage(files);
  };
  const handleChange = (e) => {
    setError(initError);
    let { value, name } = e.target;
    if (name === "openStatus") {
      setForm({ ...Form, [name]: !Form.openStatus });
    } else setForm({ ...Form, [name]: value });
  };
  const handleTimechange = (timeNow, type) => {
    settime({ ...time, [type]: timeNow });
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

    if (moment(time.open).isValid() === false) {
      err["openTime"] = "Invalid time";
      formValid = false;
    }

    if (moment(time.close).isValid() === false) {
      err["closeTime"] = "Invalid time";
      formValid = false;
    }

    setError(err);
    return formValid;
  };
  const imageCleared = () => {
    setImage("CLEARED");
  };
  const handleSubmit = (secureUrl) => {
    if (validInputs()) {
      const finalTimes = {
        formatted: {
          open: moment(time.open).format("LT"),
          close: moment(time.close).format("LT"),
        },
        unformatted: {
          open: time.open,
          close: time.close,
        },
      };
      const Result = {
        ...Form,
        photos: secureUrl,
        timings: finalTimes,
      };
      setForm(Initform);
      setImage("CLEARALL");
      dispatch(addHotel(Result)).then((res) => {
        if (res) {
          if (res.status === 201) {
            setLoading(false);
            setnotify({
              msg: "Hotel added",
              type: "success",
              popup: true,
            });
          } else {
            setLoading(false);
            setnotify({
              msg: "Error",
              type: "error",
              popup: true,
            });
          }
        }
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
      <Notify props={notify} closeAlert={closeAlert} />
      <HotelForm
        Form={Form}
        handleChange={handleChange}
        handleSubmit={uploadImage}
        setFiles={setFiles}
        Images={image}
        Error={Error}
        type={"Add"}
        Helper={""}
        Loading={Loading}
        handleTimechange={handleTimechange}
        time={time}
        imageCleared={imageCleared}
      />
    </>
  );
}
