import { UpdateUserParams } from "../../models";
import { getUserPerId, refreshUser, validatePassword } from "../../repositories";
import { encryptPassword } from "../../utils";
import { Request } from "express";
import { getToken } from "../../utils";
import { verifyEmailExists } from "../../providers";

export default async function updateUserAndReturn(req: Request, params: UpdateUserParams) {
  await verifyEmailExists(params.new_email);

  const id = getToken(req);

  const user = await getUserPerId(id);

  await validatePassword(params.password, user.password);

  const cryptPassword = await encryptPassword(params.new_password);

  const refreshed = {
    email: params.new_email,
    password: cryptPassword
  };

  const newUser = await refreshUser(refreshed, id);

  return newUser;
};
