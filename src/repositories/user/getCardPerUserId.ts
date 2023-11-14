import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { dateFormatter } from "../../utils";
import {
  DatabaseCardParams,
  GetCardPerUserIdParams
} from "../../models";

export default async function getCardPerUserId(params: GetCardPerUserIdParams) {
  const card: DatabaseCardParams = await db(params.cardType.toLowerCase() + "_cards")
    .where({ user_id: params.userId }).first();

  if (!card) {
    throw new HttpStatusError(`this user not have a ${params.cardType.toLowerCase()} card`, 404);
  }

  card.created_at = dateFormatter(card.created_at);

  return card;
};
