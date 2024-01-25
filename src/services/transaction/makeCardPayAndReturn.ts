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

  const getCard = {
    cardType: "credit",
    userId
  };

  await Promise.all([
    validatePassword(params.password, user.password),
    getCardPerUserId(getCard)
  ]);

  validateOutput(user.balance, params.value);

  const transaction = {
    type: "output",
    description: "card pay",
    value: params.value
  };

  const result = await Promise.all([
    cardPay(params.value, userId),
    removeValue("balance", params.value, userId),
    createNewTransaction(transaction, userId)
  ]);

  const transactionResponse = result[ 2 ];

  return transactionResponse;
};
