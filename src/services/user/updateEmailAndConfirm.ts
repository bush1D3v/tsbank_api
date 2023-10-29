import { Request } from "express";
import { UpdateUserMailParams } from "../../models";
import { verifyEmailExists } from "../../providers";
import { getUserPerId, refreshUserEmail, validatePassword } from "../../repositories";
import { getToken } from "../../utils";

export default async function updateEmailAndConfirm(req: Request, params: UpdateUserMailParams) {
  await verifyEmailExists(params.new_email);

  const id = getToken(req);

  const user = await getUserPerId(id);

  await validatePassword(params.password, user.password);

  await refreshUserEmail(user.password, params.new_email);
};
