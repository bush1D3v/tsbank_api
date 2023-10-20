import { sign } from "jsonwebtoken";
import jwtPassword from "../jwt/jwtPassword";
import { DatabaseParams } from "../models/user/DatabaseParams";

const createToken = (user: DatabaseParams) => {
  const token = sign({ id: user.id }, jwtPassword, { expiresIn: process.env.JWT_EXPIRES });

  const { password: _, ...logedUser } = user;

  return {
    user: logedUser,
    token
  };
};

export default createToken;
