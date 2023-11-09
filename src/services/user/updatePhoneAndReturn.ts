import { Request } from "express";
import { getToken, validatePassword } from "../../utils";
import { getUserPerId, refreshUserPhone } from "../../repositories";
import { UpdateUserPhoneParams } from "../../models";
import { verifyPhoneExists } from "../../providers";

export default async function updatePhoneAndReturn(req: Request, params: UpdateUserPhoneParams) {
  const id = getToken(req);

  const user = await getUserPerId(id);

  await validatePassword(params.password, user.password);

  await verifyPhoneExists(params.new_phone);

  const returnedPhone = await refreshUserPhone(user.phone, params.new_phone);

  return returnedPhone;
};
