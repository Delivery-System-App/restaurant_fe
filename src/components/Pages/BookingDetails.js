import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import BackButton from "../buttons/BackButton";
import { bookingDetailsById } from "../../redux/apiActions";
import { useDispatch } from "react-redux";

const BookingDetails = ({ bookid }) => {

    const dispatch = useDispatch();
    const [details, setdetails] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(bookingDetailsById(bookid)).then((resp) => {
            const { data: res } = resp;
            setdetails(res);
        });
    }, [dispatch, bookid]);
    return (
        <div>
            <BackButton />
            <br /> <br />
            <h1>Booking details of {bookid}</h1><br /><br />
            <Card>
                <CardContent>
                    <h1 >Booking ID: <span className="text-gray-500 whitespace-no-wrap">{bookid}</span></h1>
                    <br /><br />
                    <h1 >Delivery Status: <span className="text-gray-500 whitespace-no-wrap">{details.data?.deliveryStatus}</span></h1>
                    <h1 >Payment Status: <span className="text-gray-500 whitespace-no-wrap">{details.data?.payStatus}</span></h1>
                    <h1 >Cancel Status: <span className="text-gray-500 whitespace-no-wrap">{details.data?.cancelStatus}</span></h1>
                    <br /><br />
                    <h1>Customer Details:</h1><br />
                    <h1 >Name: <span className="text-gray-500 whitespace-no-wrap">{details.data?.user.name}</span></h1>
                    <h1 >Email: <span className="text-gray-500 whitespace-no-wrap">{details.data?.user.email}</span></h1>
                    <h1 >Address: <span className="text-gray-500 whitespace-no-wrap">{details.data?.deliveryAdd}</span></h1>
                </CardContent>
            </Card>
        </div>
    );
}
export default BookingDetails;