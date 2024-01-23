import { sign } from "jsonwebtoken";
import jwtPassword from "../jwt/jwtPassword";
import { DatabaseUserParams } from "../models";

export default function createToken(user: DatabaseUserParams) {
  const token = sign({ id: user.id }, jwtPassword, { expiresIn: process.env.JWT_EXPIRES });

  const { password: _, ...logedUser } = user;

  return {
    user: logedUser,
    token
  };
};
