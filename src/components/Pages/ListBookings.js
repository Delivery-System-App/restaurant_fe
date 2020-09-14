import React, { useEffect, useState } from "react";
import BackButton from "../buttons/BackButton";
import useHeading from "./useHeading";
import { hotelBookingDetails, updateBooking } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import { DELIVERY_STATUS } from "../Common/constants";
import { navigate } from "hookrouter";
import Notify from "../../utils/Notify";
import SearchBar from "../SearchBar/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
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

const useStyles = makeStyles((theme) => ({
  form: {
    minwidth: "500px",
    //margin: "0px auto",
    // padding: "20px 30px 20px 30px",
  },
  button: {
    height: "35px",
    width: "75px",
    fontSize: 10,
  },
}));

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
  const classes = useStyles();
  useHeading("Bookings");
  const dispatch = useDispatch();
  const [details, setdetails] = useState({});
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ msg: "", type: "", popup: false });
  let bookingList = useState();
  const [filteredValue, setFilteredValue] = useState([]);
  const [reRender, setreRender] = useState(Math.random());
  const [form, setform] = useState("");
  const [filters, setFilters] = useState({
    DEL_STATUS: DELIVERY_STATUS.PENDING.type,
    CANCEL_STATUS: false,
    SEARCH_PARAM: "",
  });
  const applyFilter = (res, type) => {
    if (res.data) {
      setFilteredValue(
        res.data.filter((el) => {
          return (
            el.deliveryStatus === type &&
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") >=
              moment(selectedDateFrom).format("DD-MM-YYYY") &&
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") <=
              moment(selectedDateTo).format("DD-MM-YYYY") &&
            (String(el.bookId)
              .toLowerCase()
              .includes(String(filters.SEARCH_PARAM).toLowerCase()) ||
              String(el.user.name)
                .toLowerCase()
                .includes(String(filters.SEARCH_PARAM).toLowerCase()) ||
              String(el.deliveryAdd)
                .toLowerCase()
                .includes(String(filters.SEARCH_PARAM).toLowerCase()))
          );
        })
      );
    }
  };
  const applySearch = (res, param) => {
    if (res.data) {
      setFilteredValue(
        res.data.filter((el) => {
          return (
            el.deliveryStatus === filters.DEL_STATUS &&
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") >=
              moment(selectedDateFrom).format("DD-MM-YYYY") &&
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") <=
              moment(selectedDateTo).format("DD-MM-YYYY") &&
            (String(el.bookId)
              .toLowerCase()
              .includes(String(param).toLowerCase()) ||
              String(el.user.name)
                .toLowerCase()
                .includes(String(param).toLowerCase()) ||
              String(el.deliveryAdd)
                .toLowerCase()
                .includes(String(param).toLowerCase()))
          );
        })
      );
    }
  };
  const applyDateFilterFrom = (res, date) => {
    setSelectedDateFrom(date);
    if (res.data) {
      setFilteredValue(
        res.data.filter((el) => {
          return (
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") >=
              moment(date).format("DD-MM-YYYY") &&
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") <=
              moment(selectedDateTo).format("DD-MM-YYYY") &&
            filters.DEL_STATUS === el.deliveryStatus &&
            (String(el.bookId)
              .toLowerCase()
              .includes(String(filters.SEARCH_PARAM).toLowerCase()) ||
              String(el.user.name)
                .toLowerCase()
                .includes(String(filters.SEARCH_PARAM).toLowerCase()) ||
              String(el.deliveryAdd)
                .toLowerCase()
                .includes(String(filters.SEARCH_PARAM).toLowerCase()))
          );
        })
      );
    }
  };
  const applyDateFilterTo = (res, date) => {
    setSelectedDateTo(date);
    if (res.data) {
      setFilteredValue(
        res.data.filter((el) => {
          return (
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") >=
              moment(selectedDateFrom).format("DD-MM-YYYY") &&
            moment(new Date(el.createdAt)).format("DD-MM-YYYY") <=
              moment(date).format("DD-MM-YYYY") &&
            filters.DEL_STATUS === el.deliveryStatus &&
            (String(el.bookId)
              .toLowerCase()
              .includes(String(filters.SEARCH_PARAM).toLowerCase()) ||
              String(el.user.name)
                .toLowerCase()
                .includes(String(filters.SEARCH_PARAM).toLowerCase()) ||
              String(el.deliveryAdd)
                .toLowerCase()
                .includes(String(filters.SEARCH_PARAM).toLowerCase()))
          );
        })
      );
    }
  };
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());

  const handleDateChangeFrom = (date) => {
    if (
      moment(new Date(date)).format("DD-MM-YYYY") <=
      moment(selectedDateTo).format("DD-MM-YYYY")
    ) {
      applyDateFilterFrom(details, date);
    } else {
      console.log("notify selected from date is ahead of to date");
    }
  };
  const handleDateChangeTo = (date) => {
    if (
      moment(new Date(date)).format("DD-MM-YYYY") >=
      moment(selectedDateFrom).format("DD-MM-YYYY")
    ) {
      applyDateFilterTo(details, date);
    } else {
      console.log("notify selected to date is behind from date");
    }
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
        applyDateFilterFrom(res, new Date());
        applyDateFilterTo(res, new Date());
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

  const handleSearchChange = (e) => {
    setFilter("SEARCH_PARAM", e.target.value);
    applySearch(details, e.target.value);
  };

  if (filteredValue.length > 0) {
    bookingList = filteredValue.map((e) =>
      filters.CANCEL_STATUS === false ? (
        <TableRow
          key={e.bookId}
          hover
          onClick={() => navigate(`/bookings/${e.bookId}`)}
        >
          <TableCell className=" border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{e.bookId}</div>
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
          ) : e.deliveryStatus === "Confirmed" ? (
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
          ) : e.deliveryStatus === "Ready to deliver" ? (
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
          )}
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
      <br />
      <div>
        <Grid className="flex" container spacing={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid className="flex" justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="Orders from"
                label="Orders from"
                format="dd/MM/yyyy"
                value={selectedDateFrom}
                onChange={handleDateChangeFrom}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          &nbsp;&nbsp;
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid className="flex" justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="Orders till"
                label="Orders till"
                format="dd/MM/yyyy"
                value={selectedDateTo}
                onChange={handleDateChangeTo}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <div className="block flex flex-row mt-2 mb-1 md:hidden lg:hidden">
          <FormControl className={classes.form}>
            <InputLabel id="demo-simple-select-helper-label">
              New Requests
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={(e) => {
                setform(e.target.value);
                setFilter("DEL_STATUS", e.target.value.type);
                applyFilter(details, e.target.value.string);
              }}
              value={form}
            >
              <MenuItem disabled>New requests</MenuItem>
              {Object.values(DELIVERY_STATUS).map((status) => {
                return (
                  <MenuItem value={status}>
                    {status.string === "Pending" ? (
                      <>New Requests</>
                    ) : (
                      <>{status.string}</>
                    )}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Select a type from list</FormHelperText>
          </FormControl>
          <div className="h-1/3 text-center mt-8 w-1/2">
            <Button
              onClick={() => setFilter("CANCEL_STATUS", !filters.CANCEL_STATUS)}
              variant="contained"
              size="small"
              className={classes.button}
              color={`${filters.CANCEL_STATUS ? "secondary" : "default"}`}
              style={{ outline: "none" }}
            >
              Cancelled Orders
            </Button>
          </div>
        </div>
        <div className="md:block lg:block  hidden">
          <Grid container spacing={3}>
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
                    {status.string === "Pending" ? (
                      <>New Requests</>
                    ) : (
                      <>{status.string}</>
                    )}
                  </Button>
                </div>
              ))}
            </Grid>
            <Grid item className="flex" xs={12} sm={10}>
              <Button
                onClick={() =>
                  setFilter("CANCEL_STATUS", !filters.CANCEL_STATUS)
                }
                variant="contained"
                size="small"
                color={`${filters.CANCEL_STATUS ? "secondary" : "default"}`}
                style={{ outline: "none" }}
              >
                Cancelled Orders
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className="w-full text-center my-1 m-0 m-auto">
          <SearchBar searchChange={handleSearchChange} />
        </div>
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
                  {filters.DEL_STATUS === "Pending" ? (
                    <StyledTableCell>confirm/cancel order</StyledTableCell>
                  ) : filters.DEL_STATUS === "Confirmed" ? (
                    <StyledTableCell>Ready to be delivered</StyledTableCell>
                  ) : filters.DEL_STATUS === "Ready to deliver" ? (
                    <StyledTableCell>Change status</StyledTableCell>
                  ) : (
                    <>
                      <StyledTableCell>Payment Status</StyledTableCell>
                    </>
                  )}
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
