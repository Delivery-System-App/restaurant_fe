import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const BannerDelete = ({ open = false, handleClose, handleSubmit, form }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete banner</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete this image
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ outline: "none" }}>
          <Button
            style={{ outline: "none" }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit(form)}
            color="secondary"
            autoFocus
            style={{ outline: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BannerDelete;
