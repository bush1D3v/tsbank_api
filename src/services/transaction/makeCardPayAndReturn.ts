import { Request } from "express";
import { OutputTransactionParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import {
  cardPay,
  createNewTransaction,
  getUserPerId,
  removeValue
} from "../../repositories";
import { validateOutput } from "../../providers";

export default async function makeCardPayAndReturn(req: Request, params: OutputTransactionParams) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  await validatePassword(params.password, user.password);

  validateOutput(user.balance, params.value);

  await cardPay(params.value, userId);

  await removeValue("balance", params.value, userId);

  const transaction = {
    type: "output",
    description: "card pay",
    value: params.value
  };

  const transactionResponse = await createNewTransaction(transaction, userId);

  return transactionResponse;
};
