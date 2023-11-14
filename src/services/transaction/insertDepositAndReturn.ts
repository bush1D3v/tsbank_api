import { Request } from "express";
import { HttpStatusError } from "../../error";
import { DepositParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import { undefinedUser } from "../../providers";
import {
  createNewDeposit,
  createNewTransaction,
  getUserPerId,
  getUserPerEmail
} from "../../repositories";

export default async function insertDepositAndReturn(req: Request, params: DepositParams) {
  const validEmail = await getUserPerEmail(params.email);

  if (!validEmail) {
    throw new HttpStatusError("email not found", 404);
  }

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  await validatePassword(params.password, user.password);

  await createNewDeposit(params.email, params.value);

  let transactionParams = {
    type: "input",
    description: "deposit",
    value: params.value
  };

  const inputTransaction = await createNewTransaction(transactionParams, validEmail.id);

  return inputTransaction;
};
