import db from "../../data/connection";

export default async function dropCards(user_id: number) {
  await db("credit_cards").delete().where({ user_id });
  await db("debit_cards").delete().where({ user_id });
}
