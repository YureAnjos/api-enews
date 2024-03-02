import User from "../models/User.js";

export const getAll = () => {
  return User.find({});
};

export const getById = (id) => {
  return User.findById(id);
};

export const create = (body) => {
  return User.create(body);
};

export const update = (id, name, username, email, avatar, background) => {
  return User.findByIdAndUpdate(id, {
    name,
    username,
    email,
    avatar,
    background,
  });
};
