import { Request } from "express";
import { dropTransaction } from "../../repositories";
import getTransactionAndReturn from "./getTransactionAndReturn";

export default async function deleteTransactionAndConfirm(req: Request, transaction_id: number) {
  await getTransactionAndReturn(req, transaction_id);

  await dropTransaction(transaction_id);
};
