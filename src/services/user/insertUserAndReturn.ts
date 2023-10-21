import { UserParams } from "../../models";
import { createNewUser } from "../../repositories";
import { encryptPassword } from "../../utils";

const insertUserAndReturn = async (params: UserParams) => {
  const cryptPassword = await encryptPassword(params.password);

  const newUser = [
    params.name,
    params.email,
    cryptPassword
  ];

  const user = await createNewUser(newUser);

  return user;
};

export default insertUserAndReturn;
