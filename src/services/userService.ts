import { PASSWORD_NOT_MATCH, USER_NOT_FOUND } from "../constants/errorMessages";
import { User } from "../data/models/User";
import { getAllUser, getStateForUser, updateUser } from "../data/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const checkLogin = async (username: string, password: string) => {
  const user = await getStateForUser(username.replace(".", "-"));
  if (!user) throw new Error(USER_NOT_FOUND);
  const check = bcrypt.compareSync(password, user.password);
  if (!check) throw new Error(PASSWORD_NOT_MATCH);
  const data = {
    ...user,
    password: undefined,
    email: user.email.replace("-", ".")
  };
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d"
  });

  return {
    data,
    accessToken
  };
};

export const updateUserData = async (email: string, data: Partial<User>) => {
  const rawEmail = email.replace(".", "-");
  return updateUser(rawEmail, data);
};

export const getUserByEmail = async (email: string) => {
  const allUser = await getAllUser();
  const parseUser = Object.keys(allUser).map((id) => allUser[id]);
  return parseUser.find((user) => user.email === email);
};

export default {
  checkLogin,
  updateUserData
};
