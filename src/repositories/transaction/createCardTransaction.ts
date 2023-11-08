import db from "../../data/connection";

export default async function createCardTransaction(cardType: string, user_id: number, value: number) {
  if (cardType.toLowerCase() === "credit") {
    await db(cardType.toLowerCase() + "_cards").decrement("balance", value).where({
      user_id
    });
  } else {
    await db("users").decrement("balance", value).where({
      id: user_id
    });
  }
};
