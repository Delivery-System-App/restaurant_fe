import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useHeading from "../useHeading";
import { phonePreg, validateEmailAddress } from "../../../utils/validation";
import BackButton from "../../buttons/BackButton";
import Notify from "../../../utils/Notify";
import CustomerForm from "./CustomerForm";
import { addCustomer } from "../../../redux/apiActions";

export default function AddCustomer() {
  useHeading("Add Customer");
  const dispatch = useDispatch();
  const Initform = {
    name: "",
    email: "",
    contact: "",
    loyalty: "",
  };
  const initError = {
    name: "",
    email: "",
    contact: "",
    loyalty: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const optionalValues = ["email"];

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { contact, email, loyalty } = Form;

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "" && !optionalValues.includes(key)) {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    if (isNaN(loyalty)) {
      err["loyalty"] = "Enter a number";
      formValid = false;
    }
    if (!validateEmailAddress(email)) {
      err["email"] = "Enter a valid email";
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
      const Result = {
        ...Form,
      };
      setForm(Initform);
      console.log(Result);
      dispatch(addCustomer(Result)).then((res) => {
        if (res) {
          if (res.status === 201) {
            setLoading(false);
            setnotify({
              msg: "Customer added",
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

  return (
    <>
      <BackButton />
      <Notify props={notify} closeAlert={closeAlert} />
      <CustomerForm
        Form={Form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        Error={Error}
        type={"Add"}
        Helper={""}
        Loading={Loading}
      />
    </>
  );
}
