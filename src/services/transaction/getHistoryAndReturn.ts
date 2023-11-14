import { Request } from "express";
import { getToken } from "../../utils";
import { verifyAccountTransactions } from "../../providers";
import { getTransactions, getTypedTransactions } from "../../repositories";

export default async function getHistoryAndReturn(req: Request) {
  const id = getToken(req);

  const transactions = await getTransactions(id);

  verifyAccountTransactions(transactions);

  const typedTransactions = getTypedTransactions(transactions);

  return typedTransactions;
};
