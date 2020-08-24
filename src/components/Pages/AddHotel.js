import React, { useState } from "react";
import { phonePreg } from "../../utils/validation";
import { addHotel } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import HotelForm from "./HotelForm";
import Notify from "../../utils/Notify";

export default function AddressForm() {
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
        if (res) {
          if (res.status === 201) {
            setnotify({
              msg: "Hotel added",
              type: "success",
              popup: true,
            });
          } else {
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
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <HotelForm
        Form={Form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setFiles={setFiles}
        Error={Error}
        type={"Add"}
        Helper={""}
      />
    </>
  );
}
