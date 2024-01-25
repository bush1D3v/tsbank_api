import { Request } from "express";
import { dropTransaction, getUserPerId } from "../../repositories";
import { DeleteTransactionParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import {
  undefinedUser,
  validateTransaction,
  verifyTransactionId
} from "../../providers";

export default async function deleteTransactionAndConfirm(req: Request, params: DeleteTransactionParams) {
  await verifyTransactionId(params.transaction_id);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  await Promise.all([
    validatePassword(params.password, user.password),
    validateTransaction(params.transaction_id, userId),
    dropTransaction(params.transaction_id)
  ]);
};
