import { Request } from "express";
import { OutputTransactionParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import { undefinedUser, validateOutput } from "../../providers";
import {
  cardPay,
  createNewTransaction,
  getCardPerUserId,
  getUserPerId,
  removeValue
} from "../../repositories";

export default async function makeCardPayAndReturn(req: Request, params: OutputTransactionParams) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  await validatePassword(params.password, user.password);

  const getCard = {
    cardType: "credit",
    userId
  };

  await getCardPerUserId(getCard);

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
