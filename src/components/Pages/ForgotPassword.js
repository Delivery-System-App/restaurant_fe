import React, { useState } from "react";
import {
  Grid,
  Card,
  TextField,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import UseHeading from "./useHeading";
import { validateEmailAddress } from "../../utils/validation";
import Notify from "../../utils/Notify";
import Back from "../buttons/BackButton";

const ForgotPassword = () => {
  UseHeading("Reset Password");
  const [email, setemail] = useState("");
  const [error, seterror] = useState(false);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const handleSubmit = () => {
    if (validateEmailAddress(email)) {
      console.log(email);
    } else {
      seterror(true);
      setnotify({ msg: "Invalid email", popup: true, type: "error" });
    }
  };

  return (
    <>
      <Back />
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="text-center w-full justify-center">
        <Grid>
          <Typography style={{ fontSize: 30, fontWeight: "bold" }}>
            Reset Password
          </Typography>
        </Grid>
        <Grid>
          <Card className="lg:w-1/3 w-full mt-5 md:w-2/3 m-0 m-auto p-0 md:p-8 lg:p-10">
            <CardContent>
              <Typography variant="h6">
                Enter your email id <EmailIcon size="medium" className="mb-1" />
              </Typography>
              <div className="flex flex-row mt-3">
                <TextField
                  value={email}
                  onChange={(e) => {
                    seterror(false);
                    setemail(e.target.value);
                  }}
                  size="small"
                  variant="outlined"
                  onKeyPress={(event) => {
                    if (event.charCode === 13) {
                      handleSubmit();
                    }
                  }}
                  error={error}
                ></TextField>
                <Button
                  style={{ marginLeft: 5, outline: "none" }}
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </>
  );
};

export default ForgotPassword;
