import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.send(token);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};
