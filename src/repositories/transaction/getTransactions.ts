import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { DatabaseTransactionParams } from "../../models";

export default async function getTransactions(id: number) {
  const transactions: DatabaseTransactionParams[] = await db("transactions").where({ user_id: id });

  if (transactions.length < 1) {
    throw new HttpStatusError("Your account does not have any registered transaction", 404);
  }

  return transactions;
};
