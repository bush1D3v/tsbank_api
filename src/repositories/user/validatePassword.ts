import { compare } from "bcrypt";

export default async function validatePassword(reqPassword: string, userPassword: string) {
  const password = await compare(reqPassword, userPassword);

  return password;
};
