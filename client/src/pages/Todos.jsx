// Todos.js
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodoThunk,
  fetchTodosThunk,
  deleteTodoThunk,
  updateTodoThunk,
} from "../store/todos/todosThunk";
import Profile from "./Profile";
import TodoInput from "../components/Todos/TodoInput";
import TodoList from "../components/Todos/TodoList";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton.jsx";

const Todos = () => {
  const dispatch = useDispatch();
  const { items: todos, loading } = useSelector((state) => state.todos);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");

    if (!title.trim().length) {
      toast.error("Todo can't be empty");
      return;
    }
    setIsAdding(true);
    dispatch(addTodoThunk(title))
      .unwrap()
      .then(() => {
        toast.success("Todo added successfully!");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsAdding(false));

    event.target.reset();
  };

  const deleteTodo = (id) => {
    dispatch(deleteTodoThunk(id))
      .unwrap()
      .then(() => toast.success("Todo deleted!"))
      .catch((err) => toast.error(err.message));
  };

  const handleComplete = (id, currentTitle, isCompleted) => {
    dispatch(
      updateTodoThunk({ id, title: currentTitle, isCompleted: !isCompleted })
    )
      .unwrap()
      .then(() => toast.success("Todo updated!"))
      .catch((err) => toast.error(err.message));
  };

  const handleUpdate = ({ title, id, currentIsCompleted }) => {
    dispatch(updateTodoThunk({ id, title, isCompleted: currentIsCompleted }))
      .unwrap()
      .then(() => toast.success("Todo title updated!"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <Container maxWidth="sm">
      <div className="flex justify-end">
        <Profile />
      </div>
      <h1 className="bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-700 font-bold text-4xl text-center mb-6 text-transparent bg-clip-text">
        My Todos
      </h1>
      <TodoInput handleAddTodo={handleAddTodo} isAdding={isAdding} />
      <>
        {todos.length ? (
          <TodoList
            todos={todos}
            handleComplete={handleComplete}
            deleteTodo={deleteTodo}
            handleUpdate={handleUpdate}
          />
        ) : (
          <span>"You don't have any todo"</span>
        )}
      </>
    </Container>
  );
};

export default Todos;
