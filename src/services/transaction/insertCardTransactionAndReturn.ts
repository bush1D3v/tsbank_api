import { Request } from "express";
import { CardTransactionParams } from "../../models";
import { getToken } from "../../utils";
import {
  createCardTransaction,
  createNewTransaction,
  getCardPerUserId,
  validateOutput,
  validatePassword
} from "../../repositories";

export default async function insertCardTransactionAndReturn(req: Request, params: CardTransactionParams) {
  const userId = getToken(req);

  const card = await getCardPerUserId(userId, params.card_type);

  await validatePassword(params.password.toString(), card.password);

  validateOutput(card.balance, params.value);

  await createCardTransaction(params.card_type, userId, params.value);

  const transactionParams = {
    type: "output",
    description: params.card_type.toLowerCase(),
    value: params.value
  };

  const responseTransaction = await createNewTransaction(transactionParams, userId);

  return responseTransaction;
};
