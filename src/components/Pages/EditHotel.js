import React, { useState, useEffect } from "react";
import { updateHotel, allHotels } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import HotelForm from "./HotelForm";
import { phonePreg } from "../../utils/validation";
import Notify from "../../utils/Notify";
import { imageUploader } from "../../utils/helper";
import BackButton from "../buttons/BackButton";
import moment from "moment";

function EditHotel({ id }) {
  const dispatch = useDispatch();
  const initError = {
    name: "",
    photos: "",
    location: "",
    address: "",
    contact: "",
  };
  let initForm = {
    name: "",
    photos: "",
    location: "",
    address: "",
    contact: "",
    openTime: "",
    closeTime: "",
  };
  const [Error, setError] = useState(initError);
  const [Form, setForm] = useState(initForm);
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [image, setImage] = useState("");
  const [time, settime] = useState({
    open: new Date("2000-08-18T08:00:00"),
    close: new Date("2000-08-18T21:00:00"),
  });
  useEffect(() => {
    setLoading(true);
    let mount = true;

    if (mount) {
      dispatch(allHotels()).then((res) => {
        if (res) {
          const len = res.data.data;
          const Resp = Object.values(len);
          const result = Resp.filter((obj) => obj.id === id);
          setForm(result[0]);
          if (result[0].timings !== undefined) {
            const timing = result[0].timings;
            const { open, close } = timing.unformatted;
            settime({ open, close });
          }
        }
        setLoading(false);
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch, id]);
  const setFiles = (files) => {
    //    setForm({ ...Form, photos: files });
    setImage(files);
  };
  const handleTimechange = (timeNow, type) => {
    settime({ ...time, [type]: timeNow });
  };
  const handleChange = (e) => {
    setnotify({
      popup: false,
    });
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };

  const uploadImage = () => {
    if (validInputs()) {
      setLoading(true);
      imageUploader(image, handleSubmit);
    }
  };
  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { contact } = Form;
    if (Form.name === "") {
      formValid = false;
      err["name"] = "This field is required";
    }
    if (Form.address === "") {
      formValid = false;
      err["address"] = "This field is required";
    }
    if (Form.number === "") {
      formValid = false;
      err["number"] = "This field is required";
    }

    if (moment(time.open).isValid() === false) {
      err["openTime"] = "Invalid time";
      formValid = false;
    }

    if (moment(time.close).isValid() === false) {
      err["closeTime"] = "Invalid time";
      formValid = false;
    }

    if (!phonePreg(contact)) {
      formValid = false;
      err["contact"] = "Enter Valid phone number";
    }

    setError(err);
    return formValid;
  };
  const handleSubmit = (secureUrl) => {
    if (validInputs()) {
      setLoading(true);
      /*   let formData = new FormData();
      Object.keys(Form).forEach((key) => {
        if (key === "photos" && Form[key] !== "") {
          Form[key].forEach((el) => {
            formData.append(key, el);
          });
        } else {
          formData.append(key, Form[key]);
        }
      });
      */
      let Result;
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
      if (secureUrl !== "") {
        Result = {
          ...Form,
          photos: secureUrl,
          timings: finalTimes,
        };
      } else {
        Result = {
          ...Form,
          timings: finalTimes,
        };
      }
      dispatch(updateHotel([id + "/update-Restaurant"], Result)).then((res) => {
        if (res) {
          if (res.status === 200) {
            setLoading(false);
            setnotify({
              msg: "Hotel updated",
              type: "success",
              popup: true,
            });
          }
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

  return (
    <>
      <BackButton />
      <Notify props={notify} closeAlert={closeAlert} />
      <HotelForm
        Form={Form}
        handleChange={handleChange}
        handleSubmit={uploadImage}
        setFiles={setFiles}
        Error={Error}
        type={"Update"}
        Loading={Loading}
        handleTimechange={handleTimechange}
        time={time}
        Helper={"Adding new will remove previous ones"}
      />
    </>
  );
}

export default EditHotel;
