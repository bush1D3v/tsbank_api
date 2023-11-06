import db from "../../data/connection";
import { RefreshCardParams } from "../../models";

export default async function refreshCardPassword(params: RefreshCardParams) {
  await db(params.card_type.toLowerCase() + "_cards").update({
    password: params.new_password
  }).where({
    id: params.card_id
  });
};
