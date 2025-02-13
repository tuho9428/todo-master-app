import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  console.log("req.cookies", req.cookies);

  const token = req.cookies?.access_token;
  console.log("token", token);
  if (!token) {
    return next(createError(401, "Not Authenticated"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};
