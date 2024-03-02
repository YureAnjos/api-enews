import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = (email) => {
  return User.findOne({ email }).select("+password");
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 });
};
