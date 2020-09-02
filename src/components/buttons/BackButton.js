import React from "react";
import { ArrowBack } from "@material-ui/icons";
import { Button } from "@material-ui/core";

const BackButton = () => {
  return (
    <div className="w-1/4 fixed hidden md:block lg:block">
      <Button
        variant="contained"
        color="primary"
        style={{ outline: "none" }}
        size="small"
        className="fixed"
        startIcon={<ArrowBack />}
        onClick={() => window.history.back()}
      >
        Back
      </Button>
    </div>
  );
};

export default BackButton;
