import React, { useState } from "react";
import { phonePreg } from "../../utils/validation";
import { addHotel } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import HotelForm from "./HotelForm";
import Notify from "../../utils/Notify";
import useHeading from "./useHeading";
import { imageUploader } from "../../utils/helper";

export default function AddHotel() {
  useHeading("Add Hotel");
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
  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);

  const setFiles = (files) => {
    // setForm({ ...Form, photos: files });
    setImage(files);
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
  const imageCleared = () => {
    setImage("CLEARED");
  };
  const handleSubmit = (secureUrl) => {
    if (validInputs()) {
      //let formData = new FormData();
      const Result = {
        ...Form,
        photos: secureUrl,
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
        imageCleared={imageCleared}
      />
    </>
  );
}
