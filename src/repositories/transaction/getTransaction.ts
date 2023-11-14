import db from "../../data/connection";
import { DatabaseTransactionParams } from "../../models";
import { dateFormatter } from "../../utils";

export default async function getTransaction(transaction_id: number) {
  const transaction: DatabaseTransactionParams = await db("transactions")
    .where({ id: transaction_id }).first();

  if (transaction) {
    transaction.date = dateFormatter(transaction.date);
  };

  return transaction;
};
