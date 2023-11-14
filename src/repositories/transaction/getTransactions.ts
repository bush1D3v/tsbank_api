import db from "../../data/connection";
import { DatabaseTransactionParams } from "../../models";

export default async function getTransactions(id: number) {
  const transactions: DatabaseTransactionParams[] = await db("transactions").where({ user_id: id });

  return transactions;
};
