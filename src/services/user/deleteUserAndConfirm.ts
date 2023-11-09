import { Request } from "express";
import { getToken, validatePassword } from "../../utils";
import {
  dropCards,
  dropTransactions,
  eraseUser,
  getUserPerId
} from "../../repositories";

export default async function deleteUserAndConfirm(req: Request, password: string) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(password, user.password);

  await dropTransactions(userId);

  await dropCards(userId);

  await eraseUser(userId);
};
