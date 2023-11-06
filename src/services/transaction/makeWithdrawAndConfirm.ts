import { Request } from "express";
import { OutputTransactionParams } from "../../models";
import { getToken } from "../../utils";
import {
  createNewTransaction,
  getUserPerId,
  removeValue,
  validateOutput,
  validatePassword
} from "../../repositories";

export default async function makeWithdrawAndConfirm(req: Request, params: OutputTransactionParams) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(params.password, user.password);

  validateOutput(user.balance, params.value);

  await removeValue("balance", params.value, userId);

  const transaction = {
    type: "Output",
    description: "Withdraw",
    value: params.value
  };

  const responseTransaction = await createNewTransaction(transaction, userId);

  return responseTransaction;
};
