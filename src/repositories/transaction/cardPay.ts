import db from "../../data/connection";

export default async function cardPay(value: number, userId: number) {
  await db("credit_cards").increment("balance", value)
    .where({
      "user_id": userId
    });
  await db("users").decrement("balance", value)
    .where({
      "id": userId
    });
};
