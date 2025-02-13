import { createError } from "../utils/error.js";
import { connectToDb } from "../utils/connect.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  const data = req.body;
  console.log("Data", data);

  if (!data?.email || !data?.password) {
    return next(createError(400, "Missing fields"));
  }
  await connectToDb();
  const alreadyRegistered = await User.exists({ email: data.email });
  if (alreadyRegistered) return next(createError(400, "User already exists."));
  //res.send("register");
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({ ...req.body, password: hash });
  await newUser.save();
  res.status(201).json("User created successfully!");
}

export async function login(req, res, next) {
  const data = req.body;
  console.log("Data", data);

  if (!data?.email || !data?.password) {
    return next(createError(400, "Missing fields"));
  }
  await connectToDb();
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(createError(400, "Invalid credentials"));
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) return next(createError(400, "Invalid credentials"));
  const token = jwt.sign({ id: user._id }, process.env.JWT);
  console.log("token", token);
  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false for http
    })
    .status(200)
    .json({ message: "User logged in" });
}

export async function logout(req, res, next) {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false for http
    })
    .status(200)
    .json({ message: "Logged out successfully" });
}

// Check if the user is logged in (token validation)
export const checkToken = (req, res) => {
  if (req.user) {
    return res.status(200).json({ code: 200, data: req.user });
  } else {
    return res
      .status(401)
      .json({ message: "Token has expired or is invalid." });
  }
};
