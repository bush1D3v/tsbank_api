import { Request } from "express";
import { UpdateCardPasswordParams } from "../../models";
import { getCardPerUserId, refreshCardPassword } from "../../repositories";
import {
  encryptPassword,
  getToken,
  validatePassword
} from "../../utils";

export default async function updateCardPasswordAndConfirm(req: Request, params: UpdateCardPasswordParams) {
  const userId = getToken(req);

  const cardParams = {
    cardType: params.card_type,
    userId
  };

  const card = await getCardPerUserId(cardParams);

  await validatePassword(params.password, card.password);

  const password = await encryptPassword(params.new_password);

  const refreshParams = {
    card_id: card.id,
    card_type: params.card_type,
    new_password: password
  };

  await refreshCardPassword(refreshParams);
};
