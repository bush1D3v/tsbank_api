import { Request } from "express";
import { getToken } from "../../utils";
import { createNewDeposit, createNewTransaction } from "../../repositories";

export default async function insertDepositAndConfirm(req: Request, value: number) {
  const id = getToken(req);

  await createNewDeposit(id, value);

  const params = {
    type: "Input",
    description: "Deposit",
    value
  };

  await createNewTransaction(params, id);
};
