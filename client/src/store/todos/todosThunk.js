import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodosThunk = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await fetch("http://localhost:3000/api/todos", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch todos");
    return response.json();
  }
);

export const addTodoThunk = createAsyncThunk("todos/addTodo", async (title) => {
  const response = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return await response.json();
});

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (id) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to delete todo");
    return id;
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, title, isCompleted }) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, isCompleted }),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    await response.json();
    return {
      _id: id,
      title,
      isCompleted,
    };
  }
);
