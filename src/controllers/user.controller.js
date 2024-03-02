import * as userService from "../services/user.service.js";

export const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const user = await userService.getById(req.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const message = await userService.update(req.id, req.body);
    res.status(200).send(message);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};
