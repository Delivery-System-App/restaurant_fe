import React, { useState, useEffect } from "react";
import { updateHotel, allHotels } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import HotelForm from "./HotelForm";
import { phonePreg } from "../../utils/validation";
import Notify from "../../utils/Notify";
import { imageUploader } from "../../utils/helper";

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
  };
  const [Error, setError] = useState(initError);
  const [Form, setForm] = useState(initForm);
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [iurl, setUrl] = useState("");
  const [image, setImage] = useState("");
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
      const Result = {
        ...Form,
        photos: secureUrl,
      };
      dispatch(updateHotel([id + "/update-Restaurant"], Result)).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setnotify({
            msg: "Hotel updated",
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

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <HotelForm
        Form={Form}
        handleChange={handleChange}
        handleSubmit={uploadImage}
        setFiles={setFiles}
        Error={Error}
        type={"Update"}
        Loading={Loading}
        Helper={"Adding new will remove previous ones"}
      />
    </>
  );
}

export default EditHotel;
