import { Request } from "express";
import { CardTransactionParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import { undefinedUser, validateOutput } from "../../providers";
import {
  createCardTransaction,
  createNewTransaction,
  getCardPerUserId,
  getUserPerId
} from "../../repositories";

export default async function insertCardTransactionAndReturn(req: Request, params: CardTransactionParams) {
  const userId = getToken(req);

  const cardParams = {
    cardType: params.card_type,
    userId
  };

  const card = await getCardPerUserId(cardParams);

  await validatePassword(params.password, card.password);

  if (typeof card.balance === "undefined") {
    const user = await getUserPerId(userId);

    undefinedUser(user);

    validateOutput(user.balance, params.value);
  } else {
    validateOutput(card.balance, params.value);
  }

  await createCardTransaction(params.card_type, userId, params.value);

  const transactionParams = {
    type: "output",
    description: params.card_type.toLowerCase(),
    value: params.value
  };

  const result = await Promise.all([
    createCardTransaction(params.card_type, userId, params.value),
    createNewTransaction(transactionParams, userId)
  ]);

  const responseTransaction = result[ 1 ];

  return responseTransaction;
};
