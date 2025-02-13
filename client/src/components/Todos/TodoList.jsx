import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, handleComplete, deleteTodo, handleUpdate }) => {
  return (
    <div className="shadow-md border-1 border-stone-300 bg-transparent flex flex-col rounded">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          handleComplete={handleComplete}
          deleteTodo={deleteTodo}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
