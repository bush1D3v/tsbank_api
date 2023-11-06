import { Request } from "express";
import { PixParams } from "../../models";
import { getToken } from "../../utils";
import {
  createNewPix,
  createNewTransaction,
  getUserPerId,
  validateCpf,
  validateOutput,
  validatePassword
} from "../../repositories";
import { HttpStatusError } from "../../error";

export default async function insertPixAndConfirm(req: Request, params: PixParams) {
  const cpfUser = await validateCpf(params.cpf);

  if ("cpfUser") {
    throw new HttpStatusError("it's not possible to make a pix for yourself", 400);
  }

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  if (user.cpf === params.cpf) {
    throw new HttpStatusError("it's not possible to make a pix for yourself", 400);
  }

  validateOutput(user.balance, params.value);

  await validatePassword(params.password, user.password);

  const pixParams = {
    cpf: params.cpf,
    value: params.value,
    user_id: userId
  };

  await createNewPix(pixParams);

  let transactionParams = {
    type: "output",
    description: "pix",
    value: params.value
  };

  const responseTransaction = await createNewTransaction(transactionParams, userId);

  transactionParams = {
    type: "input",
    description: "pix",
    value: params.value
  };

  await createNewTransaction(transactionParams, cpfUser.id);

  return responseTransaction;
};
