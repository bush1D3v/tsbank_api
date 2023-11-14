import { Request } from "express";
import { UpdateUserPhoneParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import { getUserPerId, refreshUserPhone } from "../../repositories";
import { undefinedUser, verifyPhoneExists } from "../../providers";

export default async function updatePhoneAndReturn(req: Request, params: UpdateUserPhoneParams) {
  const id = getToken(req);

  const user = await getUserPerId(id);

  undefinedUser(user);

  await validatePassword(params.password, user.password);

  await verifyPhoneExists(params.new_phone);

  const returnedPhone = await refreshUserPhone(user.phone, params.new_phone);

  return returnedPhone;
};
