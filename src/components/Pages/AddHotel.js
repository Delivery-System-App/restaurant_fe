import React, { useState, useEffect } from "react";
import { phonePreg } from "../../utils/validation";
import { addHotel } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import HotelForm from "./HotelForm";
import Notify from "../../utils/Notify";
import useHeading from "./useHeading";

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
  const [iurl, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (iurl) {
      handleSubmit();
    }
  }, [iurl]);

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
  const handleSubmit = () => {
    if (validInputs()) {
      let formData = new FormData();
      setForm(Initform);
      setImage("CLEARALL");
      Object.keys(Form).forEach((key) => {
        if (key === "photos" && Form[key] !== "") {
          formData.append(key, Form[key]);
        } else {
          formData.append(key, Form[key]);
        }
      });
      dispatch(addHotel(Form)).then((res) => {
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

  //needs to be done for multiple images
  const uploadImage = () => {
    if (validInputs()) {
      setLoading(true);
      const data = new FormData();
      if (image !== "" && image !== "CLEARED" && image !== "CLEARALL") {
        data.append("file", image[0]);
        data.append("upload_preset", "delivery-app");
        data.append("cloud_name", "dnpows3tq");
        fetch("https://api.cloudinary.com/v1_1/dnpows3tq/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setForm({ ...Form, photos: data.secure_url });
            setUrl(data.secure_url);
            handleSubmit();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        handleSubmit();
      }
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
