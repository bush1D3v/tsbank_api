import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { DatabaseCardParams } from "../../models";

type responseCards = {
  credit: DatabaseCardParams;
  debit: DatabaseCardParams;
}

export default async function getCardsPerUserId(userId: number) {
  const credit: DatabaseCardParams = await db("credit_cards")
    .where({ user_id: userId }).first();

  const debit: DatabaseCardParams = await db("debit_cards")
    .where({ user_id: userId }).first();

  if (!credit && !debit) {
    throw new HttpStatusError("This user not have a card", 404);
  }

  const cards: responseCards = {
    credit,
    debit
  };

  return cards;
};
