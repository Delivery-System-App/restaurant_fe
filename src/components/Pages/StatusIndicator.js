import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";

function StatusIndicator({ status }) {
  const [state, setstate] = useState({ clr: "", msg: "" });
  useEffect(() => {
    if (status === 0) {
      setstate({ clr: "#b2a300", msg: "PENDING" });
    } else if (status === 1) {
      setstate({ msg: "APPROVED", clr: "#52b202" });
    } else if (status === -1) {
      setstate({ clr: "#d32f2f", msg: "REJECTED" });
    } else if (status === "VEG") {
      setstate({ clr: "#52b202", msg: "VEG" });
    } else if (status === "NONVEG") {
      setstate({ clr: "#d32f2f", msg: "NON VEG" });
    } else {
      setstate({ msg: "UNKNOWN", clr: "#1769aa" });
    }
  }, [status]);
  return (
    <Card
      style={{ backgroundColor: state.clr }}
      className="rounded py-1 px-1 text-center"
    >
      <p style={{ color: "white" }}>{state.msg}</p>
    </Card>
  );
}

export default StatusIndicator;
