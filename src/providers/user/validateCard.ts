import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { DatabaseCardParams, ValidateCardParams } from "../../models";

export default async function validateCard(params: ValidateCardParams) {
  const userHaveCard: DatabaseCardParams[] = await db(params.card_type.toLowerCase() + "_cards")
    .where({
      user_id: params.user_id
    });

  if (userHaveCard.length > 0) {
    throw new HttpStatusError(`this user already have a ${params.card_type.toLowerCase()} card`, 409);
  }

  const cardExists: DatabaseCardParams[] = await db(params.card_type.toLowerCase() + "_cards")
    .where({
      "card_number": params.card_number
    });

  if (cardExists.length > 0) {
    throw new HttpStatusError(`this ${params.card_type} card already used per other user`, 409);
  }
};
