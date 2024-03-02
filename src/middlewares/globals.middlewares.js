import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as userRepositories from "../repositories/user.repositories.js";

export const validId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  req.id = id;
  next();
};

export const isAuthorized = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).send({ message: "Unauthorized" });

  const split = authorization.split(" ");
  const [schema, token] = split;

  if (split.length !== 2)
    return res.status(400).send({ message: "Unauthorized" });
  if (schema !== "Bearer")
    return res.status(400).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    if (error) return res.status(400).send({ message: "Invalid Token" });

    const user = await userRepositories.getById(decoded.id);
    if (!user || !user._id) {
      return res.status(400).send({ message: "Invalid Token" });
    }

    req.userId = user._id;

    return next();
  });
};
