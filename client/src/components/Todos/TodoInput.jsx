// TodoInput.js
import React from "react";
import { Button, Input } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const TodoInput = ({ handleAddTodo, isAdding }) => {
  return (
    <form onSubmit={handleAddTodo} className="flex gap-4 items-center mb-4">
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter todo"
        fullWidth
        color="secondary"
        sx={{
          paddingLeft: "1rem",
          border: "solid 1px",
          borderRadius: "5px",
          borderColor: "#ccc",
        }}
      />
      <Button
        className="btn-hover"
        variant="contained"
        color="secondary"
        type="submit"
        disabled={isAdding}
      >
        <AddCircleOutlineIcon />
      </Button>
    </form>
  );
};

export default TodoInput;
