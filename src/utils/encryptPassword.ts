import { hash } from "bcrypt";

const encryptPassword = async (password: string) => {
  const cryptPassword = await hash(password, 10);

  return cryptPassword;
};

export default encryptPassword;
