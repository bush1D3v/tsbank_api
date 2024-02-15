import { Request } from "express";
import { dropTransaction, getUserPerId } from "../../repositories";
import { DeleteTransactionParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import { validateTransaction, verifyTransactionId } from "../../providers";

export default async function deleteTransactionAndConfirm(req: Request, params: DeleteTransactionParams) {
  await verifyTransactionId(params.transaction_id);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(params.password, user.password);

  await validateTransaction(params.transaction_id, userId);

  await dropTransaction(params.transaction_id);
};
