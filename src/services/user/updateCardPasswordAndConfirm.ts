import { Request } from "express";
import { UpdateCardPasswordParams } from "../../models";
import { encryptPassword, getToken } from "../../utils";
import { getCardPerUserId, refreshCardPassword, validatePassword } from "../../repositories";

export default async function updateCardPasswordAndConfirm(req: Request, params: UpdateCardPasswordParams) {
  const userId = getToken(req);

  const card = await getCardPerUserId(userId, params.card_type);

  await validatePassword(params.password, card.password);

  const password = await encryptPassword(params.new_password.toString());

  const refreshParams = {
    card_id: card.id,
    card_type: params.card_type,
    new_password: password
  };

  await refreshCardPassword(refreshParams);
};
