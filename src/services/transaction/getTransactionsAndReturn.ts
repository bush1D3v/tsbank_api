import { Request } from "express";
import { getToken } from "../../utils";
import { getTransactions } from "../../repositories";
import { HttpStatusError } from "../../error";

const getTransactionsAndReturn = async (req: Request) => {
  const id: number = getToken(req);

  const transactions = await getTransactions(id);

  if (transactions.length < 1) {
    throw new HttpStatusError("Your account does not have any registered transactions", 404);
  }

  return transactions;
};

export default getTransactionsAndReturn;
