import db from "../../data/connection";
import { DatabaseTransactionParams } from "../../models";
import { dateFormatter } from "../../utils";

export default async function getTransactions(id: number) {
  const transactions: DatabaseTransactionParams[] = await db("transactions").where({ user_id: id });

  if (transactions) {
    for (let transaction of transactions) {
      transaction.date = dateFormatter(transaction.date);
    }
  };

  return transactions;
};
