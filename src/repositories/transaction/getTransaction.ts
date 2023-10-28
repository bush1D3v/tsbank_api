import db from "../../data/connection";
import { DatabaseTransactionParams } from "../../models";

export default async function getTransaction(transaction_id: Number) {
  const transaction: DatabaseTransactionParams = await db("transactions")
    .where({ id: transaction_id }).first();

  return transaction;
};
