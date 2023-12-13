import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { DatabaseCardParams } from "../../models";
import { dateFormatter } from "../../utils";

type responseCards = {
  credit: DatabaseCardParams;
  debit: DatabaseCardParams;
}

export default async function getCardsPerUserId(user_id: number) {
  const credit: DatabaseCardParams = await db("credit_cards")
    .where({ user_id }).first();

  const debit: DatabaseCardParams = await db("debit_cards")
    .where({ user_id }).first();

  if (!credit && !debit) {
    throw new HttpStatusError("this user not have a card", 404);
  }

  if (typeof credit !== "undefined") {
    credit.created_at = dateFormatter(credit.created_at);
  }

  if (typeof debit !== "undefined") {
    debit.created_at = dateFormatter(debit.created_at);
  }

  const cards: responseCards = {
    credit,
    debit
  };

  return cards;
};
