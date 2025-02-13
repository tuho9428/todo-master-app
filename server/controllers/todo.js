import { createError } from "../utils/error.js";
import { connectToDb } from "../utils/connect.js";
import Todo from "../models/todoModel.js";

export async function getAllTodos(req, res, next) {
  await connectToDb();
  const todos = await Todo.find({ userId: req.user.id });
  res.status(200).send(todos);
}

export async function getTodo(req, res, next) {
  try {
    await connectToDb();
    const todo = await Todo.findById(req.params.id);
    if (!todo) return next(createError(404, "Todo not found"));
    if (todo.userId.toString() !== req.user.id)
      return next(createError(401, "Not Authorized"));
    res.status(200).send(todo);
  } catch (error) {
    return next(createError(404, "Todo not found"));
  }
}

export async function updateTodo(req, res, next) {
  const id = req.params.id;
  if (!req.body) return next(createError(400, "Missing fields"));
  try {
    await connectToDb();
    const todo = await Todo.findById(id);
    if (todo.userId.toString() !== req.user.id)
      return next(createError(401, "Not Authorized"));
    todo.title = req.body.title || todo.title;
    if (req.body.isCompleted !== undefined) {
      todo.isCompleted = req.body.isCompleted;
    }
    await todo.save();
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    return next(createError(404, "Todo not found"));
  }
}
export async function deleteTodo(req, res, next) {
  try {
    await connectToDb();
    const todo = await Todo.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!todo.deletedCount) return next(createError(400, "Todo not found"));
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    return next(createError(400, "Todo not found"));
  }
}

export async function addTodo(req, res, next) {
  console.log("req.body", req.body);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (!req.body || !req.body.title) {
    return next(createError(404, "Title is required"));
  }
  await connectToDb();
  const newTodo = new Todo({ title: req.body.title, userId: req.user.id });
  await newTodo.save();
  res.status(201).json(newTodo);
}
