import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Card } from "@material-ui/core";
import ModalDialog from "./ModalDialog";

const RatingCard = ({ stars, review }) => {
  const [state, setstate] = useState("");
  const [open, setopen] = useState(false);
  useEffect(() => {
    if (stars === 5) {
      setstate("#64dd17");
    } else if (stars === 4) {
      setstate("#b2ff59");
    } else if (stars === 3) {
      setstate("#eeff41");
    } else if (stars === 2) {
      setstate("#ff6d00");
    } else {
      setstate("#e65100");
    }
  }, [stars]);

  return (
    <div>
      <ModalDialog
        open={open}
        handleClose={() => setopen(false)}
        dialog={review}
      />
      <Card
        style={{ margin: 5, padding: 10, height: 120, cursor: "pointer" }}
        onClick={() => setopen(true)}
      >
        <Box
          style={{ width: "100%", textAlign: "center" }}
          component="fieldset"
          mb={1}
          borderColor="transparent"
        >
          <Rating
            name="read-only"
            style={{
              color: state,
            }}
            value={stars}
            readOnly
          />
        </Box>
        <Typography>
          <p className="truncate">
            <span style={{ fontWeight: "bold" }}>{"Review : "}</span>
            {review}
          </p>
        </Typography>
      </Card>
    </div>
  );
};
export default RatingCard;
