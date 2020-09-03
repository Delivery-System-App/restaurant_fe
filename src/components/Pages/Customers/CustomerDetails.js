import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import { useDispatch } from "react-redux";
import BackButton from "../../buttons/BackButton";

const CustomerDetails = ({ customerid }) => {
  const dispatch = useDispatch();
  const [details, setdetails] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setdetails({
      name: "Arihant",
      email: "arihant2310@gmail.com",
      contact: "8129210496",
    });
    // dispatch(bookingDetailsById(bookid)).then((resp) => {
    //   if (resp) {
    //     const { data: res } = resp;
    //     setdetails(res);
    //   }
    // });
  }, [dispatch, customerid]);
  return (
    <div>
      <BackButton />
      <br /> <br />
      <h1>Customer details of {customerid}</h1>
      <br />
      <br />
      <Card>
        <CardContent>
          <h1>
            Customer ID:{" "}
            <span className="text-gray-500 whitespace-no-wrap">
              {customerid}
            </span>
          </h1>
          <br />
          <br />
          <h1>Customer Details:</h1>
          <br />
          <h1>
            Name:{" "}
            <span className="text-gray-500 whitespace-no-wrap">
              {details?.name}
            </span>
          </h1>
          <h1>
            Contact:{" "}
            <span className="text-gray-500 whitespace-no-wrap">
              {details.contact}
            </span>
          </h1>
          <h1>
            Email:{" "}
            <span className="text-gray-500 whitespace-no-wrap">
              {details.email}
            </span>
          </h1>
        </CardContent>
      </Card>
    </div>
  );
};
export default CustomerDetails;
