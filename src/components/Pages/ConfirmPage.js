import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmPage({
  handleConfirm,
  sentence,
  confirmDialog,
  cancelDialog,
  id,
  buttonText,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Confirmed = () => {
    setOpen(false);
    handleConfirm(id);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ padding: "4px", outline: "none" }}
        color="secondary"
        onClick={handleClickOpen}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {sentence}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ outline: "none" }}
            onClick={handleClose}
            color="primary"
          >
            {cancelDialog}
          </Button>
          <Button
            style={{ outline: "none" }}
            onClick={Confirmed}
            color="secondary"
            autoFocus
          >
            {confirmDialog}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
