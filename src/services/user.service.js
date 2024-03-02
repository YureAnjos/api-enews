import * as userRepositories from "../repositories/user.repositories.js";
import { ErrorWS } from "../util/index.js";

const restructureUser = (user) => ({
  id: user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  background: user.background,
});

export const getAll = async () => {
  const users = await userRepositories.getAll();

  return {
    results: users.map((user) => restructureUser(user)),
  };
};

export const getById = async (userId) => {
  const user = await userRepositories.getById(userId);
  if (!user) throw new ErrorWS("User not found", 400);

  return restructureUser(user);
};

export const create = async (body) => {
  const { name, username, email, password, avatar, background } = body;
  if (!name || !username || !email || !password || !avatar || !background)
    throw new ErrorWS("Send all parameters to register", 400);

  const user = await userRepositories.create(body);
  if (!user) throw new ErrorWS("Error creating user", 400);

  return {
    message: "User successfully created",
    user: restructureUser(user),
  };
};

export const update = async (userId, body) => {
  const { name, username, email, avatar, background } = body;
  if (!name && !username && !email && !avatar && !background)
    throw new ErrorWS("Submit at least one field to update user", 400);

  await userRepositories.update(
    userId,
    name,
    username,
    email,
    avatar,
    background
  );
  return { message: "User successfully updated" };
};
