import React, { useEffect, useState } from "react";
import useHeading from "../useHeading";
import { useDispatch } from "react-redux";
import { getAllhotels, pendingApproval } from "../../../redux/apiActions";
import { APPROVAL_STATUS } from "../../Common/constants";
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
const AdminDashboard = () => {
  useHeading("Admin Dashboard");

  const dispatch = useDispatch();
  const [details, setdetails] = useState({});
  const [Loading, setLoading] = useState(false);

  let hotelList = useState();
  const [filteredValue, setFilteredValue] = useState([]);

  const [filters, setFilters] = useState({
    APPROVE_STATUS: APPROVAL_STATUS.PENDING.string,
  });

  const applyFilter = (res, type) => {
    if (res) {
      setFilteredValue(
        res.filter((el) => {
          return el.approved === type;
        })
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    dispatch(getAllhotels()).then((resp) => {
      if (resp) {
        const { data: res } = resp;
        setdetails(res);
        applyFilter(res, 0);
      }
      setLoading(false);
    });
    // eslint-disable-next-line
  }, [dispatch]);

  function setFilter(type, value) {
    setFilters({ ...filters, [type]: value });
  }

  function updateStatus(id, value) {
    let body = {
      approval: value,
    };
    setLoading(true);
    dispatch(pendingApproval([id], body)).then((resp) => {
      if (resp.status === 201) {
        window.location.reload(false);
      }
      setLoading(false);
    });
  }

  if (filteredValue.length > 0) {
    let i = 0;
    hotelList = filteredValue.map((e) => (
      <TableRow key={e.bookId} hover onClick={() => navigate(`/`)}>
        <TableCell className=" border-b border-gray-200 text-sm ">
          <Typography className="items-center">
            <div className="ml-2">{++i}</div>
          </Typography>
        </TableCell>
        <TableCell className=" border-b border-gray-200 text-sm ">
          <Typography className="items-center">
            <div className="ml-2">{e.name}</div>
          </Typography>
        </TableCell>
        <TableCell className="border-b border-gray-200 text-sm ">
          <Typography className="items-center">
            <div className="ml-2">{e.address}</div>
          </Typography>
        </TableCell>
        <TableCell className=" border-b border-gray-200 text-sm ">
          <Typography className="items-center">
            <div className="ml-2">{e.contact}</div>
          </Typography>
        </TableCell>
        {filters.APPROVE_STATUS === 0 ? (
          <TableCell className=" border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    updateStatus(e.id, 1);
                  }}
                >
                  Approve
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    updateStatus(e.id, -1);
                  }}
                >
                  Reject
                </Button>
              </div>
            </Typography>
          </TableCell>
        ) : (
          <TableCell className="border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{e.location}</div>
            </Typography>
          </TableCell>
        )}
      </TableRow>
    ));
  } else if (Loading) {
    hotelList = (
      <TableRow>
        <TableCell
          colSpan={4}
          className=" border-b border-gray-200 text-center "
        >
          <Typography>Loading Hotels....</Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    hotelList = (
      <TableRow>
        <TableCell
          colSpan={4}
          className=" border-b border-gray-200 text-center "
        >
          <Typography>No Hotels available</Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          <Grid item className="flex" xs={12} sm={6}>
            {Object.values(APPROVAL_STATUS).map((status) => (
              <div className="mx-1">
                <Button
                  key={status.type}
                  variant="contained"
                  size="small"
                  style={{ outline: "none" }}
                  color={`${
                    filters.APPROVE_STATUS === status.string
                      ? "primary"
                      : "default"
                  }`}
                  onClick={() => {
                    setFilter("APPROVE_STATUS", status.string);
                    applyFilter(details, status.string);
                  }}
                >
                  {status.type}
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
                  <StyledTableCell>Index</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Contact</StyledTableCell>
                  {filters.APPROVE_STATUS === 0 ? (
                    <StyledTableCell> </StyledTableCell>
                  ) : (
                    <StyledTableCell>Location</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody className={"cursor-pointer"}>{hotelList}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};
export default AdminDashboard;
