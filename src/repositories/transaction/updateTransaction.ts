import { DatabaseTransactionParams, TransactionParams } from "../../models";
import db from "../../data/connection";

const updateTransaction = async (params: TransactionParams, id: number) => {
  const transaction: DatabaseTransactionParams[] = await db("transactions").update({
    type: params.type,
    description: params.description,
    value: params.value,
    categorie_id: params.categorie_id,
  }).where({ id }).returning("*");

  return transaction[ 0 ];
};

export default updateTransaction;
