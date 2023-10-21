import { UserParams } from "../../models";
import { createNewUser } from "../../repositories";
import { encryptPassword } from "../../utils";

const insertUserAndReturn = async (params: UserParams) => {
  const cryptPassword = await encryptPassword(params.password);

  const newUser = {
    name: params.name,
    email: params.email,
    password: cryptPassword
  };

  const user = await createNewUser(newUser);

  return user;
};

export default insertUserAndReturn;
