import { Request } from "express";
import { getToken } from "../../utils";
import { getTransactions } from "../../repositories";

const getTransactionsAndReturn = async (req: Request) => {
  const id: number = getToken(req);

  const transactions = await getTransactions(id);

  if (transactions.length < 1) {
    throw new Error("Your account does not have any registered transactions");
  }

  return transactions;
};

export default getTransactionsAndReturn;
