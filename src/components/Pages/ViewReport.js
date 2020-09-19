import React, { useEffect, useState } from "react";
import useHeading from "./useHeading";
import BackButton from "../buttons/BackButton";
import { useDispatch } from "react-redux";
import { getSalesReport, getItemReport } from "../../redux/apiActions";
import { REPORTS } from "../Common/constants";
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
import Notify from "../../utils/Notify";
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
const ViewReport = (id) => {
    useHeading("Reports");

    const dispatch = useDispatch();
    const [details, setdetails] = useState({});
    const [Loading, setLoading] = useState(false);
    const [notify, setnotify] = useState({ msg: "", type: "", popup: false });
    let List = useState();


    const [selectedDateFrom, setSelectedDateFrom] = React.useState(moment().subtract(7, 'days'));
    const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());

    const handleDateChangeFrom = (date) => {
        if (
            moment(new Date(date)).format("DD-MM-YYYY") <=
            moment(selectedDateTo).format("DD-MM-YYYY")
        ) {
            setSelectedDateFrom(date);
        } else {
            console.log("notify selected from date is ahead of to date");
        }
    };
    const handleDateChangeTo = (date) => {
        if (
            moment(new Date(date)).format("DD-MM-YYYY") >=
            moment(selectedDateFrom).format("DD-MM-YYYY")
        ) {
            setSelectedDateTo(date);
        } else {
            console.log("notify selected to date is behind from date");
        }
    };

    let [filter] = useState({
        REPORT: REPORTS.SALES.type,
    });
    useEffect(() => {
        window.scrollTo(0, 0);
        let body = {
            from: moment(selectedDateFrom).format("YYYY-MM-DD"),
            to: moment(selectedDateTo).format("YYYY-MM-DD")
        };
        console.log("body", body);
        setLoading(true);
        if (filter.REPORT === "Sales Report") {
            dispatch(getSalesReport([id.id], body)).then((resp) => {
                if (resp.status === 201) {
                    setdetails(resp.data);
                }
                setLoading(false);
            });
        }
        else {
            dispatch(getItemReport([id.id], body)).then((resp) => {
                if (resp.status === 201) {
                    setdetails(resp.data);
                }
                setLoading(false);
            });
        }
        // eslint-disable-next-line
    }, [dispatch, selectedDateFrom, selectedDateTo]);

    function updateReport(value) {
        console.log("hello", value);
        filter.REPORT = value;
        let body = {
            from: moment(selectedDateFrom).format("YYYY-MM-DD"),
            to: moment(selectedDateTo).format("YYYY-MM-DD")
        };
        setLoading(true);
        if (value === "Sales Report") {
            dispatch(getSalesReport([id.id], body)).then((resp) => {
                if (resp.status === 201) {
                    setdetails(resp.data);
                }
                setLoading(false);
            });
        }
        else {
            dispatch(getItemReport([id.id], body)).then((resp) => {
                if (resp.status === 201) {
                    setdetails(resp.data);
                }
                setLoading(false);
            });
        }

    }
    console.log("details current", details);
    console.log("from", moment(selectedDateFrom).format("YYYY-MM-DD"));
    console.log("to", moment(selectedDateTo).format("YYYY-MM-DD"));
    const closeAlert = () => {
        setnotify({ popup: false });
    };
    if (details.length > 0) {

        List = details.map((e) => (
            <TableRow hover>
                <TableCell
                    className=" border-b border-gray-200 text-sm "
                >
                    <Typography className="items-center">
                        {filter.REPORT === "Sales Report" ?
                            e.Date
                            :
                            e.itemName
                        }
                    </Typography>
                </TableCell>
                <TableCell
                    className=" border-b border-gray-200 text-sm "
                >
                    <Typography className="items-center">
                        {filter.REPORT === "Sales Report" ?
                            e.adminAmount
                            :
                            e.itemPrice
                        }
                    </Typography>
                </TableCell>
                <TableCell
                    className="border-b border-gray-200 text-sm "
                >
                    <Typography className="items-center">
                        {filter.REPORT === "Sales Report" ?
                            e.itemPrice : e.menuName
                        }
                    </Typography>
                </TableCell>
                <TableCell
                    className=" border-b border-gray-200 text-sm "
                >
                    <Typography className="items-center">
                        {filter.REPORT === "Sales Report" ?
                            e.vendorAmount
                            :
                            e.salesCount
                        }
                    </Typography>
                </TableCell>

            </TableRow>
        ));
    } else if (Loading) {
        List = (
            <TableRow>
                <TableCell
                    colSpan={4}
                    className=" border-b border-gray-200 text-center "
                >
                    <Typography>Loading Report....</Typography>
                </TableCell>
            </TableRow>
        );
    } else {
        List = (
            <TableRow>
                <TableCell
                    colSpan={4}
                    className=" border-b border-gray-200 text-center "
                >
                    <Typography>No Report available</Typography>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <div>
            <BackButton />
            <div>
                <Grid container spacing={3} justify="center">
                    <Grid item className="flex" xs={12} sm={4}>

                        {Object.values(REPORTS).map((status) => (
                            <div className="mx-1">
                                <Button
                                    key={status.type}
                                    variant="contained"
                                    size="small"
                                    style={{ outline: "none" }}
                                    color={`${filter.REPORT === status.string
                                        ? "primary"
                                        : "default"
                                        }`}
                                    onClick={() => {
                                        updateReport(status.string);
                                    }}
                                >
                                    {status.type}
                                </Button>

                            </div>

                        ))}
                    </Grid>

                </Grid>
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
            </div>
            <div style={{ overflow: "hidden" }}>
                <Paper style={{ width: "100%", margin: "0px auto", marginTop: "15px" }}>
                    <TableContainer style={{ maxHeight: 440 }} component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>

                                    {filter.REPORT === "Sales Report" ? (
                                        <>
                                            <StyledTableCell>Date</StyledTableCell>
                                            <StyledTableCell>Admin Amount</StyledTableCell>
                                            <StyledTableCell>Item Price</StyledTableCell>
                                            <StyledTableCell>Vendor Amount</StyledTableCell>
                                        </>
                                    ) : (
                                            <>
                                                <StyledTableCell>Item Name</StyledTableCell>
                                                <StyledTableCell>Item Price</StyledTableCell>
                                                <StyledTableCell>Menu Name</StyledTableCell>
                                                <StyledTableCell>Sales Count</StyledTableCell>
                                            </>
                                        )}
                                </TableRow>
                            </TableHead>
                            <TableBody className={"cursor-pointer"}>{List}</TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
            <Notify props={notify} closeAlert={closeAlert} />
        </div>
    );
};
export default ViewReport;