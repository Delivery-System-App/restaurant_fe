import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmationBox({
  open,
  handleClose,
  data,
  handleConfirm,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {data.type} Hotel
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to {data.type} {data.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirm(data.id, data.status)}
            color="secondary"
            autoFocus
          >
            {data.type}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
