import { Request } from "express";
import { UpdateUserEmailParams } from "../../models";
import { verifyEmailExists } from "../../providers";
import { getUserPerId, refreshUserEmail } from "../../repositories";
import { getToken, validatePassword } from "../../utils";

export default async function updateEmailAndReturn(req: Request, params: UpdateUserEmailParams) {
  await verifyEmailExists(params.new_email);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(params.password, user.password);

  const returnedEmail = await refreshUserEmail(userId, params.new_email);

  return returnedEmail;
};
