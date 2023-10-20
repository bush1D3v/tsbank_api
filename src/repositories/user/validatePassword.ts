import { compare } from "bcrypt";

const validatePassword = async (reqPassword: string, userPassword: string) => {
  const password = await compare(reqPassword, userPassword);

  return password;
};

export default validatePassword;
