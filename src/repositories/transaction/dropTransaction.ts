import db from "../../data/connection";

export default async function dropTransaction(transaction_id: number) {
  await db("transactions").delete().where({ "id": transaction_id });
}
