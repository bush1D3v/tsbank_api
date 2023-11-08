import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { DatabaseCardParams, ValidateCardParams } from "../../models";

export default async function validateCard(params: ValidateCardParams) {
  const cardExists: DatabaseCardParams[] = await db(params.card_type.toLowerCase() + "_cards")
    .where({
      user_id: params.user_id
    });

  if (cardExists.length > 0) {
    throw new HttpStatusError(`This user already have a ${params.card_type.toLowerCase()} card`, 409);
  }
};
