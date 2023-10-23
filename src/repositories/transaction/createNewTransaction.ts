import db from "../../data/connection";
import { TransactionParams } from "../../models";

const createNewTransaction = async (params: TransactionParams, id: number) => {
  const newTransaction = await db("transactions").insert({
    type: params.type,
    description: params.description,
    value: params.value,
    date: params.date,
    categorie_id: params.categorie_id,
    user_id: id
  }).returning("*");

  return newTransaction[ 0 ];
};

export default createNewTransaction;
