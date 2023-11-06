import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { DatabaseCardParams } from "../../models";

export default async function getCardPerUserId(userId: number, cardType: string) {
  const card: DatabaseCardParams = await db(cardType.toLowerCase() + "_cards")
    .where({ user_id: userId }).first();

  if (!card) {
    throw new HttpStatusError(`This user not have a ${cardType.toLowerCase()} card`, 404);
  }

  return card;
};
