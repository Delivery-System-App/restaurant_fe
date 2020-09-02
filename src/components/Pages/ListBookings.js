import React, { useEffect, useState } from "react";
import BackButton from "../buttons/BackButton";
import useHeading from "./useHeading";
import { hotelBookingDetails } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import { DELIVERY_STATUS } from "../Common/constants";
import { navigate } from "hookrouter";
import { Button, Grid, Typography } from "@material-ui/core";

const Listbookings = ({ resid }) => {
  useHeading("Bookings");
  const dispatch = useDispatch();
  const [details, setdetails] = useState({});

  let bookingList = useState();
  const [filteredValue, setFilteredValue] = useState([]);

  const [filters, setFilters] = useState({
    DEL_STATUS: DELIVERY_STATUS.PENDING.type,
    CANCEL_STATUS: false,
  });
  const applyFilter = (res, type) => {
    if (res.data) {
      setFilteredValue(
        res.data.filter((el) => {
          return el.deliveryStatus === type;
        })
      );
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(hotelBookingDetails(resid)).then((resp) => {
      if (resp) {
        const { data: res } = resp;
        setdetails(res);
        applyFilter(res, "Pending");
      }
    });
  }, [dispatch, resid]);
  function setFilter(type, value) {
    setFilters({ ...filters, [type]: value });
  }

  if (details && details.status === true) {
    let i = 0;
    bookingList = filteredValue.map((e) =>
      filters.CANCEL_STATUS === false ? (
        <tr key={e.bookId} onClick={() => navigate(`/bookings/${e.bookId}`)}>
          <td className="px-5 py-5 border-b border-gray-200 text-sm ">
            <Typography className="flex items-center">
              <div className="ml-2">
                <p className="whitespace-no-wrap">{++i}</p>
              </div>
            </Typography>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm ">
            <Typography className="flex items-center">
              <div className="ml-2">
                <p className="whitespace-no-wrap">{e.user.name}</p>
              </div>
            </Typography>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm ">
            <Typography className="flex items-center">
              <div className="ml-2">
                <p className="whitespace-no-wrap">{e.deliveryAdd}</p>
              </div>
            </Typography>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 text-sm ">
            <Typography className="flex items-center">
              <div className="ml-2">
                <p className="whitespace-no-wrap">{e.payStatus}</p>
              </div>
            </Typography>
          </td>
        </tr>
      ) : (
        (bookingList = <tr></tr>)
      )
    );
  } else {
    bookingList = (
      <tr className="bg-white ">
        <td
          colSpan={3}
          className="px-5 py-5 border-b border-gray-200 text-center "
        >
          <p className="text-gray-500 whitespace-no-wrap">
            No bookings available
          </p>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <BackButton />
      <br />
      <br />
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex py-2 px-2">
          <Button
            onClick={() => setFilter("CANCEL_STATUS", !filters.CANCEL_STATUS)}
            variant="contained"
            size="small"
            color={`${filters.CANCEL_STATUS ? "secondary" : "default"}`}
          >
            Cancelled Orders
          </Button>
        </div>
        <Grid className="flex">
          {Object.values(DELIVERY_STATUS).map((status) => (
            <div className="mx-1">
              <Button
                key={status.type}
                variant="contained"
                size="small"
                color={`${
                  filters.DEL_STATUS === status.type ? "primary" : "default"
                }`}
                onClick={() => {
                  setFilter("DEL_STATUS", status.type);
                  applyFilter(details, status.string);
                }}
              >
                {status.string}
              </Button>
            </div>
          ))}
        </Grid>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="min-w-full leading-normal shadow rounded-lg overflow-hidden ">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-400 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Book ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-400 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-400 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Delivery Address
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-400 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className={"cursor-pointer"}>{bookingList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Listbookings;
