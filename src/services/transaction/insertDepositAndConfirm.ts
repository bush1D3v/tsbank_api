import { Request } from "express";
import { HttpStatusError } from "../../error";
import { DepositParams } from "../../models";
import { getToken } from "../../utils";
import {
  createNewDeposit,
  createNewTransaction,
  getUserPerId,
  validateEmail,
  validatePassword
} from "../../repositories";

export default async function insertDepositAndConfirm(req: Request, params: DepositParams) {
  const validEmail = await validateEmail(params.email);

  if (!validEmail) {
    throw new HttpStatusError("Email not found", 404);
  }

  const userId = getToken(req);

  const user = await getUserPerId(userId);

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
