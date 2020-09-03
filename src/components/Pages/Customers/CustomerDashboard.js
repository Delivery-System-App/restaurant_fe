import React, { useEffect, useState } from "react";
import { A } from "hookrouter";
import {
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button, Typography, TableCell, Paper, Table } from "@material-ui/core";
import Loader from "../../../utils/Loader";
import useHeading from "../useHeading";
import SearchBar from "../../SearchBar/SearchBar";
import ConfirmationBox from "./Confirmation";
import {
  customerDetails,
  updateCustomerDetails,
  deleteCustomer,
} from "../../../redux/apiActions";
import { phonePreg, validateEmailAddress } from "../../../utils/validation";
import Notify from "../../../utils/Notify";
import { ms } from "date-fns/locale";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  container: {
    marginTop: "10px",
  },
}));

const FormDialog = ({ open, handleClose, id, changeStatus }) => {
  const initForm = {
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
  const [form, setform] = useState(initForm);
  const [err, seterr] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const dispatch = useDispatch();
  const [confOpen, setconfOpen] = useState(false);
  const [data, setdata] = useState("");
  //modal doesn't close after successful updation
  //delete customer needs to be done
  //variable names needs to be improved
  //the list of users should re render after successful updation
  useEffect(() => {
    let mount = true;
    if (mount)
      setform({
        name: id.name,
        email: id.email,
        contact: id.contact,
        loyalty: id.loyalty,
      });
    return () => {
      mount = false;
    };
  }, [handleClose, id.contact, id.email, id.name, id.loyalty]);
  const handleChange = (e) => {
    setnotify({
      popup: false,
    });
    seterr(initError);
    const { value, name } = e.target;
    setform({ ...form, [name]: value });
  };
  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { contact, email, name, loyalty } = form;
    if (!name.replace(/\s/g, "").length) {
      formValid = false;
      err["name"] = "This field is required";
    }

    if (!phonePreg(contact)) {
      formValid = false;
      err["contact"] = "Enter Valid phone number";
    }
    if (isNaN(loyalty) || loyalty === "") {
      formValid = false;
      err["loyalty"] = "Enter a number";
    }
    if (!validateEmailAddress(email)) {
      err["email"] = "Enter a valid email";
      formValid = false;
    }

    seterr(err);
    return formValid;
  };
  const handleSubmit = () => {
    if (validInputs()) {
      let Result;

      Result = {
        ...form,
      };
      handleClose("");
      changeStatus(true, { popup: false });
      dispatch(updateCustomerDetails([id.id], Result)).then((res) => {
        if (res) {
          if (res.status === 201) {
            changeStatus(false, {
              msg: "Updated user",
              type: "success",
              popup: true,
            });
          }
        } else {
          changeStatus(false, {
            msg: "Error",
            type: "error",
            popup: true,
          });
        }
      });
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  const handleCustomerDelete = (cusId) => {
    setconfOpen(false);
    handleClose("DELETING");
    dispatch(deleteCustomer(cusId)).then((res) => {
      if (res && res.data.success) {
        handleClose("DELETED");
      }
    });
  };
  return (
    <>
      <ConfirmationBox
        open={confOpen}
        data={data}
        handleClose={() => {
          setconfOpen(false);
        }}
        handleConfirm={handleCustomerDelete}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <div className=" flex-column md:flex lg:flex">
            <div className="w-full md:w-3/4 lg:w-3/4 text-left">
              Edit Customer Details
            </div>
            <div className="w-full md:w-1/4 lg:w-1/4 text-right">
              <Button
                size="small"
                color="secondary"
                onClick={() => {
                  setconfOpen(true);
                  setdata({ cusId: id.id, cusName: id.name });
                }}
                style={{ outline: "none", borderRadius: "50%" }}
              >
                <DeleteForeverIcon color="secondary" />
                Delete
              </Button>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                onChange={handleChange}
                label="Customer Name"
                value={form.name}
                fullWidth
                error={err["name"]}
                helperText={err["name"]}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="contact"
                name="contact"
                onChange={handleChange}
                label="Mobile Number"
                value={form.contact}
                fullWidth
                error={err["contact"]}
                helperText={err["contact"]}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                onChange={handleChange}
                label="Email"
                value={form.email}
                fullWidth
                error={err["email"]}
                helperText={err["email"]}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="loyalty"
                name="loyalty"
                onChange={handleChange}
                label="Loyalty"
                value={form.loyalty}
                type="text"
                fullWidth
                error={err["loyalty"]}
                helperText={err["loyalty"]}
                autoComplete="loyalty"
              />
            </Grid>
            <Notify props={notify} closeAlert={closeAlert} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{ outline: "none" }}
            onClick={handleSubmit}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const CustomerDashboard = () => {
  const classes = useStyles();
  useHeading("Customers");
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  let customersList = useState();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [filter, setFilter] = useState("");
  const [Rerender, setRerender] = useState(Math.random());
  const [select, setselect] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
    loyalty: "",
  });

  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      dispatch(customerDetails()).then((res) => {
        if (res) {
          const len = res.data;
          setData(Object.values(len));
          setLoading(false);
        }
      });
    }
    return () => {
      mount = false;
    };
  }, [dispatch, Rerender]);

  const handleClose = (msg) => {
    setOpen(false);
    if (msg === "DELETING") {
      setLoading(true);
    }
    if (msg === "DELETED") {
      setLoading(false);
      setnotify({ msg: "Customer deleted", type: "success", popup: true });
      setRerender(Math.random());
    }
  };
  const handleClickOpen = (id, e) => {
    setselect({
      id: id,
      name: e.name,
      email: e.email,
      contact: e.contact,
      loyalty: e.loyalty,
    });
    setOpen(true);
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  const changeStatus = (LOADSTATUS, POPUPSTATUS) => {
    setLoading(LOADSTATUS);
    setnotify(POPUPSTATUS);
    if (POPUPSTATUS.type === "success") {
      setRerender(Math.random());
    }
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
          onClick={() => handleClickOpen(e.id, e)}
          // onClick={() => navigate(`/bookings/${e.bookId}`)}
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
          <TableCell className=" border-b border-gray-200 text-sm ">
            <Typography className="items-center">
              <div className="ml-2">{e.loyalty}</div>
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
        <Button variant="outlined" color="primary" style={{ outline: "none" }}>
          <A
            href="/addcustomers"
            className={classes.link}
            style={{
              color: "#757de8",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Add Customers
          </A>
        </Button>
      </Grid>
      <SearchBar searchChange={handleSearchChange} />
      {Loading ? (
        <Loader />
      ) : (
        <>
          <FormDialog
            open={open}
            handleClose={handleClose}
            id={select}
            data={Data}
            changeStatus={changeStatus}
          />
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
                      <StyledTableCell>Loyalty</StyledTableCell>
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

export default CustomerDashboard;
