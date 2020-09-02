import React, { useEffect, useState } from "react";
import BackButton from "../buttons/BackButton";
import useHeading from "./useHeading";
import { hotelBookingDetails } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import { DELIVERY_STATUS } from "../Common/constants";
import { navigate } from "hookrouter";
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
    setLoading(true);
    dispatch(hotelBookingDetails(resid)).then((resp) => {
      if (resp) {
        const { data: res } = resp;
        setdetails(res);
        applyFilter(res, "Pending");
      }
      setLoading(false);
    });
  }, [dispatch, resid]);
  function setFilter(type, value) {
    setFilters({ ...filters, [type]: value });
  }

  if (details && details.status === true) {
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
          <TableCell className=" border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{e.payStatus}</div>
            </Typography>
          </TableCell>
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => setFilter("CANCEL_STATUS", !filters.CANCEL_STATUS)}
              variant="contained"
              size="small"
              color={`${filters.CANCEL_STATUS ? "secondary" : "default"}`}
            >
              Cancelled Orders
            </Button>
          </Grid>
          <Grid item className="flex" xs={12} sm={6}>
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
                  <StyledTableCell>Payment</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={"cursor-pointer"}>{bookingList}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};
export default Listbookings;
