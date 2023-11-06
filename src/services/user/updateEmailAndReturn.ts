import { Request } from "express";
import { UpdateUserEmailParams } from "../../models";
import { verifyEmailExists } from "../../providers";
import { getUserPerId, refreshUserEmail, validatePassword } from "../../repositories";
import { getToken } from "../../utils";

export default async function updateEmailAndReturn(req: Request, params: UpdateUserEmailParams) {
  await verifyEmailExists(params.new_email);

  const id = getToken(req);

  const user = await getUserPerId(id);

  await validatePassword(params.password, user.password);

  const returnedEmail = await refreshUserEmail(user.password, params.new_email);

  return returnedEmail;
};
