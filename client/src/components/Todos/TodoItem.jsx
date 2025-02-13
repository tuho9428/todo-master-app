import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteConfirm from "../Modal/DeleteConfirm";
import EditTodo from "../Modal/EditTodo";

const TodoItem = ({ todo, handleComplete, deleteTodo, handleUpdate }) => {
  return (
    <div className={`flex h-10 items-center w-full border-stone-300`}>
      <div className="text-stone-400 hover:cursor-pointer px-5 inline-block">
        <CheckCircleIcon
          onClick={() => handleComplete(todo._id, todo.title, todo.isCompleted)}
          color={todo.isCompleted ? "secondary" : ""}
        />
      </div>
      <span
        className={`flex-1 px-3 overflow-auto whitespace-nowrap ${
          todo.isCompleted && "line-through text-amber-500"
        }`}
      >
        {todo.title}
      </span>
      <div className="flex gap-2">
        <span className="text-stone-400 icon-hover">
          <DeleteConfirm handleDelete={deleteTodo} id={todo._id} />
        </span>
        <span className="text-stone-400 icon-hover">
          <EditTodo
            handleUpdate={handleUpdate}
            title={todo.title}
            id={todo._id}
            isCompleted={todo.isCompleted}
          />
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
