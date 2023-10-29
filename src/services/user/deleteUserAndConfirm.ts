import { Request } from "express";
import { getToken } from "../../utils";
import { eraseUser, getUserPerId, validatePassword } from "../../repositories";

export default async function deleteUserAndConfirm(req: Request, password: string) {
  const id = getToken(req);

  const user = await getUserPerId(id);

  await validatePassword(password, user.password);

  await eraseUser(id);
};
