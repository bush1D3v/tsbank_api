import { DatabaseTransactionParams, TransactionParams } from "../../models";
import db from "../../data/connection";

export default async function refreshTransaction(params: TransactionParams, id: number) {
  const transaction: DatabaseTransactionParams[] = await db("transactions").update({
    type: params.type,
    description: params.description,
    value: params.value,
    category_id: params.category_id,
  }).where({ id }).returning("*");

  return transaction[ 0 ];
};
