import { Request } from "express";
import { getToken } from "../../utils";
import { UpdateUserParams } from "../../models";
import { getUserPerId, refreshUser } from "../../repositories";
import { encryptPassword, validatePassword } from "../../utils";
import {
  undefinedUser,
  verifyEmailExists,
  verifyPhoneExists
} from "../../providers";

export default async function updateUserAndReturn(req: Request, params: UpdateUserParams) {
  await Promise.all([
    verifyEmailExists(params.new_email),
    verifyPhoneExists(params.new_phone)
  ]);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  const result = await Promise.all([
    validatePassword(params.password, user.password),
    encryptPassword(params.new_password)
  ]);

  const cryptPassword = result[ 1 ];

  const refreshed = {
    new_email: params.new_email,
    new_password: cryptPassword,
    new_phone: params.new_phone
  };

  const newUser = await refreshUser(refreshed, userId);

  return newUser;
};
