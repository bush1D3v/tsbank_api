import { UserParams } from "../../models";
import { createNewUser, validateEmail } from "../../repositories";
import { encryptPassword } from "../../utils";

const insertUserAndReturn = async (params: UserParams) => {
  const cryptPassword = await encryptPassword(params.password);

  const emailExists = await validateEmail(params.email);

  if (emailExists) {
    throw new Error("Email already exists");
  }

  const newUser = [
    params.name,
    params.email,
    cryptPassword
  ];

  const user = await createNewUser(newUser);

  return user;
};

export default insertUserAndReturn;
