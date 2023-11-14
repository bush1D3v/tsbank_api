import { compare } from "bcrypt";
import { HttpStatusError } from "../error";

export default async function validatePassword(reqPassword: string, dataPassword: string) {
  const password = await compare(reqPassword, dataPassword);

  if (!password) {
    throw new HttpStatusError("invalid password", 401);
  }

  return password;
};
