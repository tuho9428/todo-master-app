import { createError } from "../utils/error.js";
import { connectToDb } from "../utils/connect.js";
import User from "../models/userModel.js";

export async function getUserInfo(req, res, next) {
  console.log("req.body", req.body);

  try {
    const userId = req.user.id;
    await connectToDb();
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const userInfo = {
      id: user._id,
      email: user.email,
    };
    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    return next(createError(500, "Server error"));
  }
}
