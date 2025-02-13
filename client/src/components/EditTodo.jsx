import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";

export default function EditTodo({ title, id, isCompleted, handleUpdate }) {
  const [open, setOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);

  useEffect(() => {
    setUpdatedTitle(title);
  }, [title]);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdatedTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdatedTitle(title);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate({ title: updatedTitle, id, currentIsCompleted: isCompleted });
    handleClose();
  };

  return (
    <>
      <EditIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make changes to your todo here. Click save when you're done.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="New Title"
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
