import db from "../../data/connection";
import { DatabaseTransactionParams, TransactionParams } from "../../models";
import { dateFormatter } from "../../utils";

export default async function createNewTransaction(params: TransactionParams, user_id: number) {
  const newTransaction: DatabaseTransactionParams[] = await db("transactions").insert({
    type: params.type,
    description: params.description,
    value: params.value,
    user_id
  }).returning("*");

  newTransaction[ 0 ].date = dateFormatter(newTransaction[ 0 ].date);

  return newTransaction[ 0 ];
};
