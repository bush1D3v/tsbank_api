import { Request } from "express";
import { UserParams } from "../../models";
import { verifyEmailExists } from "../../providers";
import { createNewUser } from "../../repositories";
import { encryptPassword } from "../../utils";

const insertUserAndReturn = async (req: Request, params: UserParams) => {
  await verifyEmailExists(req);

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
