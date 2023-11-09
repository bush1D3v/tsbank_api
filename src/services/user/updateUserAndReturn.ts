import { UpdateUserParams } from "../../models";
import { getUserPerId, refreshUser } from "../../repositories";
import { encryptPassword, validatePassword } from "../../utils";
import { Request } from "express";
import { getToken } from "../../utils";
import { verifyEmailExists, verifyPhoneExists } from "../../providers";

export default async function updateUserAndReturn(req: Request, params: UpdateUserParams) {
  await verifyEmailExists(params.new_email);

  await verifyPhoneExists(params.new_phone);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(params.password, user.password);

  const cryptPassword = await encryptPassword(params.new_password);

  const refreshed = {
    new_email: params.new_email,
    new_password: cryptPassword,
    new_phone: params.new_phone
  };

  const newUser = await refreshUser(refreshed, userId);

  return newUser;
};
