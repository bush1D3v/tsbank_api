import { Request } from "express";
import { PixParams } from "../../models";
import { getToken, validatePassword } from "../../utils";
import {
  undefinedUser,
  validateOutput,
  validatePix
} from "../../providers";
import {
  createNewPix,
  createNewTransaction,
  getUserPerId,
  getUserPerCpf
} from "../../repositories";

export default async function insertPixAndReturn(req: Request, params: PixParams) {
  const cpfUser = await getUserPerCpf(params.cpf);

  undefinedUser(cpfUser);

  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  validatePix(user.cpf, params.cpf);

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
