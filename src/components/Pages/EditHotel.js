import React, { useState, useEffect } from "react";
import { updateHotel, allHotels } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import HotelForm from "./HotelForm";
import { phonePreg } from "../../utils/validation";
import Loader from "../../utils/Loader";

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
      setLoading(true);
      let formData = new FormData();
      Object.keys(Form).forEach((key) => {
        if (key === "photos" && Form[key] !== "") {
          Form[key].forEach((el) => {
            formData.append(key, el);
          });
        } else {
          formData.append(key, Form[key]);
        }
      });

      dispatch(updateHotel([id + "/update-Restaurant"], Form)).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          alert("Success");
        }
        setLoading(false);
      });
    }
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <HotelForm
          Form={Form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setFiles={setFiles}
          Error={Error}
          type={"Update"}
          Helper={"Adding new will remove previous ones"}
        />
      )}
    </>
  );
}

export default EditHotel;
