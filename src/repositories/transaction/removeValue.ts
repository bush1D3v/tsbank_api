import db from "../../data/connection";

export default async function removeValue(accountItem: string, value: number, user_id: number) {
  if (accountItem.toLowerCase() === "credit") {
    await db("credit_cards").decrement("balance", value)
      .where({ user_id });
  } else {
    await db("users").decrement("balance", value)
      .where({ id: user_id });
  }
};
