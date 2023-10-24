import db from "../../data/connection";
import { DatabaseTransactionParams } from "../../models";

const getTransaction = async (transaction_id: Number): Promise<DatabaseTransactionParams> => {
  const transaction: DatabaseTransactionParams = await db("transactions")
    .where({ id: transaction_id }).first();

  return transaction;
};

export default getTransaction;
