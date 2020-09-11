import React, { useEffect, useState } from "react";
import {
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Button, Typography, TableCell, Paper, Table } from "@material-ui/core";
import Loader from "../../../utils/Loader";
import useHeading from "../useHeading";
import SearchBar from "../../SearchBar/SearchBar";
import { allCustomers } from "../../../redux/apiActions";
import Notify from "../../../utils/Notify";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const AllCustomers = () => {
  useHeading("Customers");
  const [Data, setData] = useState([]);
  let customersList = useState();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(allCustomers()).then((res) => {
        if (res) {
          const len = res.data.data;
          setData(Object.values(len));
          setLoading(false);
        }
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  if (Data.length > 0) {
    let i = 0;
    customersList = Data.map((e) =>
      e.name.toLowerCase().includes(filter.toLowerCase()) ||
      e.email.includes(filter.toLowerCase()) ||
      e.contact.includes(filter.toLowerCase()) ? (
        <TableRow
          key={e.id}
          hover
          //   onClick={() => handleClickOpen(e.id, e)}
        >
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
              <div className="ml-2">{e.contact}</div>
            </Typography>
          </TableCell>
          <TableCell className=" border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{e.email}</div>
            </Typography>
          </TableCell>
        </TableRow>
      ) : (
        (customersList = <tr></tr>)
      )
    );
  } else if (Loading) {
    customersList = (
      <TableRow>
        <TableCell
          colSpan={4}
          className=" border-b border-gray-200 text-center "
        >
          <Typography>Loading customers....</Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    customersList = (
      <TableRow>
        <TableCell
          colSpan={4}
          className=" border-b border-gray-200 text-center "
        >
          <Typography>No customers available</Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <Grid item container justify="center" style={{ marginBottom: "5px" }}>
        <SearchBar searchChange={handleSearchChange} />
      </Grid>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <Button
            variant="outlined"
            color="primary"
            style={{ outline: "none" }}
          >
            Customers:{Data.length}
          </Button>
          <div style={{ overflow: "hidden" }}>
            <Paper
              style={{ width: "100%", margin: "0px auto", marginTop: "15px" }}
            >
              <TableContainer style={{ maxHeight: 440 }} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Customer Id</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Contact</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={"cursor-pointer"}>
                    {customersList}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </>
      )}
      <Notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default AllCustomers;
