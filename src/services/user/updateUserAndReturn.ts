import { UserParams } from "../../models";
import { updateUser } from "../../repositories";
import { encryptPassword } from "../../utils";
import { Request } from "express";
import { getToken } from "../../utils";
import { verifyEmailExists } from "../../providers";

const updateUserAndReturn = async (req: Request, params: UserParams) => {
  await verifyEmailExists(params.email);

  const cryptPassword = await encryptPassword(params.password);

  const id = getToken(req);

  params.password = cryptPassword;

  const newUser = await updateUser(params, id);

  return newUser;
};

export default updateUserAndReturn;
