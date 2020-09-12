import React, { useEffect, useState } from "react";
import BackButton from "../buttons/BackButton";
import useHeading from "./useHeading";
import { hotelBookingDetails, updateBooking } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import { DELIVERY_STATUS } from "../Common/constants";
import { navigate } from "hookrouter";
import Notify from "../../utils/Notify";

import {
  Button,
  Grid,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Table,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Listbookings = ({ resid }) => {
  useHeading("Bookings");
  const dispatch = useDispatch();
  const [details, setdetails] = useState({});
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ msg: "", type: "", popup: false });
  let bookingList = useState();
  const [filteredValue, setFilteredValue] = useState([]);
  const [reRender, setreRender] = useState(Math.random());

  const [filters, setFilters] = useState({
    DEL_STATUS: DELIVERY_STATUS.PENDING.type,
    CANCEL_STATUS: false,
  });
  const applyFilter = (res, type) => {
    if (res.data) {
      setFilteredValue(
        res.data.filter((el) => {
          return (
            el.deliveryStatus === type &&
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") ===
            moment(selectedDate).format("DD-MM-YYYY")
          );
        })
      );
    }
  };
  const applyDateFilter = (res, date) => {
    setSelectedDate(date);
    if (res.data) {
      setFilteredValue(
        res.data.filter((el) => {
          return (
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") ===
            moment(date).format("DD-MM-YYYY") &&
            filters.DEL_STATUS === el.deliveryStatus
          );
        })
      );
    }
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    applyDateFilter(details, date);
  };

  const closeAlert = () => {
    setnotify({ popup: false });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    dispatch(hotelBookingDetails(resid)).then((resp) => {
      if (resp) {
        const { data: res } = resp;
        setdetails(res);
        applyFilter(res, "Pending");
        applyDateFilter(res, new Date());
      }
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [dispatch, reRender]);
  function setFilter(type, value) {
    setFilters({ ...filters, [type]: value });
  }

  function updateStatus(id, value) {
    let body = {
      deliveryStatus: value,
    };
    setLoading(true);
    dispatch(updateBooking([id], body)).then((resp) => {
      if (resp.status === 201) {
        if (value === "Confirmed") {
          setreRender(Math.random());
          setnotify({ msg: "Confirmed", type: "success", popup: true });
        } else {
          setreRender(Math.random());
          setnotify({ msg: "Rejected", type: "success", popup: true });
        }
      }
      setLoading(false);
    });
  }



  if (filteredValue.length > 0) {
    let i = 0;
    bookingList = filteredValue.map((e) =>
      filters.CANCEL_STATUS === false ? (
        <TableRow
          key={e.bookId}
          hover
          onClick={() => navigate(`/bookings/${e.bookId}`)}
        >
          <TableCell className=" border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{++i}</div>
            </Typography>
          </TableCell>
          <TableCell className=" border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{e.user.name}</div>
            </Typography>
          </TableCell>
          <TableCell className="border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{e.deliveryAdd}</div>
            </Typography>
          </TableCell>
          {e.deliveryStatus === "Pending" ? (
            <TableCell className=" border-b border-gray-200 text-sm ">
              <Typography className="items-center">
                <div className="ml-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      updateStatus(e.bookId, "Confirmed");
                    }}
                  >
                    Confirm
                </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      updateStatus(e.bookId, "Rejected");
                    }}
                  >
                    Cancel
                </Button>
                </div>
              </Typography>
            </TableCell>
          ) : (
              e.deliveryStatus === "Confirmed" ? (
                <TableCell className=" border-b border-gray-200 text-sm ">
                  <Typography className="items-center">
                    <div className="ml-2">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          updateStatus(e.bookId, "Ready to deliver");
                        }}
                      >
                        Ready
                  </Button>
                    </div>
                  </Typography>
                </TableCell>
              ) : (
                  e.deliveryStatus === "Ready to deliver" ? (
                    <TableCell className=" border-b border-gray-200 text-sm ">
                      <Typography className="items-center">
                        <div className="ml-2">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              updateStatus(e.bookId, "On the way");
                            }}
                          >
                            On the way
                    </Button>
                        </div>
                      </Typography>
                    </TableCell>
                  ) : (
                      <>
                        <TableCell className="border-b border-gray-200 text-sm ">
                          <Typography className="items-center">
                            <div className="ml-2">{e.payStatus}</div>
                          </Typography>
                        </TableCell>
                      </>
                    )))}
        </TableRow>
      ) : (
          (bookingList = <tr></tr>)
        )
    );
  } else if (Loading) {
    bookingList = (
      <TableRow>
        <TableCell
          colSpan={4}
          className=" border-b border-gray-200 text-center "
        >
          <Typography>Loading bookings....</Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    bookingList = (
      <TableRow>
        <TableCell
          colSpan={4}
          className=" border-b border-gray-200 text-center "
        >
          <Typography>No bookings available</Typography>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <div>
      <BackButton />
      <br />
      <br />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => setFilter("CANCEL_STATUS", !filters.CANCEL_STATUS)}
              variant="contained"
              size="small"
              color={`${filters.CANCEL_STATUS ? "secondary" : "default"}`}
              style={{ outline: "none" }}
            >
              Cancelled Orders
            </Button>
          </Grid>
          <Grid item className="flex" xs={12} sm={10}>
            {Object.values(DELIVERY_STATUS).map((status) => (
              <div className="mx-1">
                <Button
                  key={status.type}
                  variant="contained"
                  size="small"
                  style={{ outline: "none" }}
                  color={`${
                    filters.DEL_STATUS === status.type ? "primary" : "default"
                    }`}
                  onClick={() => {
                    setFilter("DEL_STATUS", status.type);
                    applyFilter(details, status.string);
                  }}
                >
                  {status.string === "Pending" ? (<>New Requests</>) : (<>{status.string}</>)}
                </Button>
              </div>
            ))}
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </div>
      <div style={{ overflow: "hidden" }}>
        <Paper style={{ width: "100%", margin: "0px auto", marginTop: "15px" }}>
          <TableContainer style={{ maxHeight: 440 }} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Book Id</StyledTableCell>
                  <StyledTableCell>Customer</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  {/* <StyledTableCell>confirm/cancel order</StyledTableCell> */}
                  {filters.DEL_STATUS === "Pending" ? (
                    <StyledTableCell>confirm/cancel order</StyledTableCell>
                  ) : (
                      filters.DEL_STATUS === "Confirmed" ? (
                        <StyledTableCell>Ready to be delivered</StyledTableCell>
                      ) : (
                          filters.DEL_STATUS === "Ready to deliver" ? (
                            <StyledTableCell>Change status</StyledTableCell>
                          ) : (
                              <>
                                <StyledTableCell>Payment Status</StyledTableCell>
                              </>
                            )))}
                </TableRow>
              </TableHead>
              <TableBody className={"cursor-pointer"}>{bookingList}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <Notify props={notify} closeAlert={closeAlert} />
    </div>
  );
};
export default Listbookings;
