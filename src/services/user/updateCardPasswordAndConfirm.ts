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

  const result = await Promise.all([
    validatePassword(params.password, card.password),
    encryptPassword(params.new_password)
  ]);

  const password = result[ 1 ];

  const refreshParams = {
    card_id: card.id,
    card_type: params.card_type,
    new_password: password
  };

  await refreshCardPassword(refreshParams);
};
