import { compare } from "bcrypt";
import { HttpStatusError } from "../../error";

export default async function validatePassword(reqPassword: string, userPassword: string) {
  const password = await compare(reqPassword, userPassword);

  if (!password) {
    throw new HttpStatusError("Invalid password", 401);
  }

  return password;
};
