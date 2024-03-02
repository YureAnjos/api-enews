import bcrypt from "bcrypt";

import { ErrorWS } from "../util/index.js";
import * as authRepositories from "../repositories/auth.repositories.js";

export const login = async (body) => {
  const { email, password } = body;

  const user = await authRepositories.login(email);
  if (!user) throw new ErrorWS("Invalid User", 400);

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throw new ErrorWS("Invalid User", 400);

  const token = authRepositories.generateToken(user._id);
  return { token };
};
