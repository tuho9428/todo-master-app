import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditTodo from "./EditTodo";
import Profile from "./Profile";
import {
  Container,
  Button,
  Input,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodoThunk,
  fetchTodosThunk,
  deleteTodoThunk,
  updateTodoThunk,
} from "../store/todos/todosThunk";
import DeleteConfirm from "./DeleteConfirm";

const Todos = () => {
  const dispatch = useDispatch();
  const { items: todos, loading, error } = useSelector((state) => state.todos);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <Container maxWidth="sm" className="pt-8">
        <Card className="shadow-lg rounded-lg">
          <CardContent className="space-y-4">
            <div className="flex justify-end">
              <Skeleton variant="circular" width={40} height={40} />
            </div>
            <Skeleton variant="text" className="h-12" />
            <Skeleton variant="rectangular" className="h-32" />
          </CardContent>
        </Card>
      </Container>
    );
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
      {todos?.length ? (
        <div className="shadow-md border-1 border-stone-300 bg-transparent flex flex-col rounded">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className={`flex h-10 items-center w-full border-stone-300`}
            >
              <div className="text-stone-400 hover:cursor-pointer px-5 inline-block">
                <CheckCircleIcon
                  onClick={() =>
                    handleComplete(todo._id, todo.title, todo.isCompleted)
                  }
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
          ))}
        </div>
      ) : (
        <span>"You don't have any todo"</span>
      )}
    </Container>
  );
};

export default Todos;
