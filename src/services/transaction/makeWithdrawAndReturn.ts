import { Request } from "express";
import { OutputTransactionParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import {
  createNewTransaction,
  getUserPerId,
  removeValue
} from "../../repositories";
import { validateOutput } from "../../providers";

export default async function makeWithdrawAndReturn(req: Request, params: OutputTransactionParams) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(params.password, user.password);

  validateOutput(user.balance, params.value);

  await removeValue("balance", params.value, userId);

  const transaction = {
    type: "output",
    description: "withdraw",
    value: params.value
  };

  const responseTransaction = await createNewTransaction(transaction, userId);

  return responseTransaction;
};
