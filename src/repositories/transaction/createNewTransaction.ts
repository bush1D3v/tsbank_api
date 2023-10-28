import db from "../../data/connection";
import { DatabaseTransactionParams, TransactionParams } from "../../models";

export default async function createNewTransaction(params: TransactionParams, id: number) {
  const newTransaction: DatabaseTransactionParams[] = await db("transactions").insert({
    type: params.type,
    description: params.description,
    value: params.value,
    category_id: params.category_id,
    user_id: id
  }).returning("*");

  return newTransaction[ 0 ];
};
