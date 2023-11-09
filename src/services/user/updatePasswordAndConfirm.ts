import { Request } from "express";
import { encryptPassword, getToken, validatePassword } from "../../utils";
import { getUserPerId, refreshUserPassword } from "../../repositories";
import { UpdateUserPasswordParams } from "../../models";

export default async function updatePasswordAndConfirm(req: Request, params: UpdateUserPasswordParams) {
  const id = getToken(req);

  const user = await getUserPerId(id);

  await validatePassword(params.password, user.password);

  const newPassword = await encryptPassword(params.new_password);

  await refreshUserPassword(id, newPassword);
};
