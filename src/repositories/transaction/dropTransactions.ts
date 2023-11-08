import db from "../../data/connection";

export default async function dropTransactions(user_id: number) {
  await db("transactions").delete().where({ user_id });
}
