import { Request } from "express";
import { getToken, validatePassword } from "../../utils";
import { undefinedUser } from "../../providers";
import {
  dropCards,
  dropTransactions,
  eraseUser,
  getUserPerId
} from "../../repositories";

export default async function deleteUserAndConfirm(req: Request, password: string) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  await Promise.all([
    validatePassword(password, user.password),
    dropTransactions(userId),
    dropCards(userId),
    eraseUser(userId)
  ]);
};
