import { Request } from "express";
import { WithdrawParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import { undefinedUser, validateOutput } from "../../providers";
import {
  createNewTransaction,
  getUserPerId,
  removeValue
} from "../../repositories";

export default async function makeWithdrawAndReturn(req: Request, params: WithdrawParams) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  const transaction = {
    type: "output",
    description: "withdraw",
    value: params.value
  };

  const result = await Promise.all([
    validatePassword(params.password, user.password),
    validateOutput(user.balance, params.value),
    removeValue("balance", params.value, userId),
    createNewTransaction(transaction, userId)
  ]);

  const responseTransaction = result[ 3 ];

  return responseTransaction;
};
