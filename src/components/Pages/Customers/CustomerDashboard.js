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

import { Button, Typography, TableCell, Paper, Table } from "@material-ui/core";
import Loader from "../../../utils/Loader";
import useHeading from "../useHeading";
import SearchBar from "../../SearchBar/SearchBar";
import {
  customerDetails,
  updateCustomerDetails,
} from "../../../redux/apiActions";
import { phonePreg, validateEmailAddress } from "../../../utils/validation";
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

const FormDialog = ({ open, handleClose, id, data }) => {
  const initForm = {
    name: "",
    email: "",
    contact: "",
  };
  const initError = {
    name: "",
    email: "",
    contact: "",
  };
  const [form, setform] = useState(initForm);
  const [err, seterr] = useState(initError);
  const [Loading, setLoading] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const dispatch = useDispatch();

  //modal doesn't close after successful updation
  //delete customer needs to be done
  //variable names needs to be improved
  //the list of users should re render after successful updation
  useEffect(() => {
    let mount = true;
    if (mount) setform({ name: id.name, email: id.email, contact: id.contact });
    return () => {
      mount = false;
    };
  }, [handleClose]);
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
    const { contact, email } = form;

    if (!phonePreg(contact)) {
      formValid = false;
      err["contact"] = "Enter Valid phone number";
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
      setLoading(true);
      let Result;

      Result = {
        ...form,
      };
      handleClose();
      dispatch(updateCustomerDetails([id.id], Result)).then((res) => {
        if (res) {
          if (res.status === 201) {
            setLoading(false);
            setnotify({
              msg: "Customer updated",
              type: "success",
              popup: true,
            });
          }
        }
        setLoading(false);
      });
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Customer Details</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          The name of menu {data.name} will be changed
        </DialogContentText> */}
        {/* <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          value={form.name}
          // error={err}
          // helperText={err}
          onChange={(e) => {
            // seterr("");
            // setform(e.target.value);
          }}
          fullWidth
        /> */}
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Notify props={notify} closeAlert={closeAlert} />
        </Grid>

        {/* <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={Form.email}
            fullWidth
            onChange={handleChange}
            error={Error["email"]}
            helperText={Error["email"]}
          />
        </Grid> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Change Name
        </Button>
      </DialogActions>
    </Dialog>
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
  const [select, setselect] = useState({
    id: "",
    name: "",
    email: "",
    contact: "",
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
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (id, e) => {
    setselect({ id: id, name: e.name, email: e.email, contact: e.contact });
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
      <notify props={notify} closeAlert={closeAlert} />
    </>
  );
};

export default CustomerDashboard;
