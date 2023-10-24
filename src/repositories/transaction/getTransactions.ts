import db from "../../data/connection";
import { DatabaseTransactionParams } from "../../models";

const getTransactions = async (id: number) => {
  const transactions: DatabaseTransactionParams[] = await db("transactions").where({ user_id: id });

  return transactions;
};

export default getTransactions;
