import { Request } from "express";
import { getToken } from "../../utils";
import { getTransactions } from "../../repositories";
import { HttpStatusError } from "../../error";

export default async function getTransactionsAndReturn(req: Request) {
  const id: number = getToken(req);

  const transactions = await getTransactions(id);

  if (transactions.length < 1) {
    throw new HttpStatusError("Your account does not have any registered transaction", 404);
  }

  return transactions;
};
