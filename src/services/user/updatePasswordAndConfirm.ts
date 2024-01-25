import { Request } from "express";
import { UpdateUserPasswordParams } from "../../models";
import { undefinedUser } from "../../providers";
import { getUserPerId, refreshUserPassword } from "../../repositories";
import {
  encryptPassword,
  getToken,
  validatePassword
} from "../../utils";

export default async function updatePasswordAndConfirm(req: Request, params: UpdateUserPasswordParams) {
  const id = getToken(req);

  const user = await getUserPerId(id);

  undefinedUser(user);

  const result = await Promise.all([
    validatePassword(params.password, user.password),
    encryptPassword(params.new_password)
  ]);

  const newPassword = result[ 1 ];

  await refreshUserPassword(id, newPassword);
};
