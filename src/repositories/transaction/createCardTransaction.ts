import db from "../../data/connection";

export default async function createCardTransaction(cardType: string, user_id: number, value: number) {
  await db(cardType.toLowerCase() + "_cards").decrement("balance", value).where({
    user_id
  });

};
