import db from "../../data/connection";

const getTransactions = async (id: number) => {
  const transactions = await db("transactions").where({ id });

  return transactions;
};

export default getTransactions;
