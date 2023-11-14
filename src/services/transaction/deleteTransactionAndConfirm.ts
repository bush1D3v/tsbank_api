import { Request } from "express";
import { dropTransaction, getUserPerId } from "../../repositories";
import { undefinedUser, validateTransaction, verifyTransactionId } from "../../providers";
import { getToken, validatePassword } from "../../utils";
import { DeleteTransactionParams } from "../../models";

export default async function deleteTransactionAndConfirm(req: Request, params: DeleteTransactionParams) {
  await verifyTransactionId(params.transaction_id);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  await validatePassword(params.password, user.password);

  await validateTransaction(params.transaction_id, userId);

  await dropTransaction(params.transaction_id);
};
