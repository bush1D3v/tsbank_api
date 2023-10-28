import { hash } from "bcrypt";

export default async function encryptPassword(password: string) {
  const cryptPassword = await hash(password, 10);

  return cryptPassword;
};
