import { Request } from "express";
import { dropTransaction, getUserPerId, validatePassword } from "../../repositories";
import { validateTransaction, verifyTransactionId } from "../../providers";
import { getToken } from "../../utils";

export default async function deleteTransactionAndConfirm(req: Request, transaction_id: number, password: string) {
  await verifyTransactionId(transaction_id);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(password, user.password);

  await validateTransaction(transaction_id, userId);

  await dropTransaction(transaction_id);
};
