import { Request } from "express";
import { UpdateUserEmailParams } from "../../models";
import { undefinedUser, verifyEmailExists } from "../../providers";
import { getUserPerId, refreshUserEmail } from "../../repositories";
import { getToken, validatePassword } from "../../utils";

export default async function updateEmailAndReturn(req: Request, params: UpdateUserEmailParams) {
  await verifyEmailExists(params.new_email);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  const result = await Promise.all([
    validatePassword(params.password, user.password),
    refreshUserEmail(userId, params.new_email)
  ]);

  const returnedEmail = result[ 1 ];

  return returnedEmail;
};
