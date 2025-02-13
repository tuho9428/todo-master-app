import express from "express";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import UserRoute from "./routes/user.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/todos", TodoRoute);

app.get("/", (req, res, next) => {
  res.send("hello word");
});

// global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
