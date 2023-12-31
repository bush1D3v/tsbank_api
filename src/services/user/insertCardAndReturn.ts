import { Request } from "express";
import { CardParams } from "../../models";
import { validateCard } from "../../providers";
import { encryptPassword, getToken } from "../../utils";
import { createCard, getBalancePerId } from "../../repositories";

export default async function insertCardAndReturn(req: Request, params: CardParams) {
  const user_id = getToken(req);

  const validateParams = {
    card_type: params.card_type,
    user_id,
    "card_number": params.card_number
  };

  await validateCard(validateParams);

  const balance = await getBalancePerId(user_id, "users");

  const cardPassword = await encryptPassword(params.password);

  const createCardParams = {
    card_number: params.card_number,
    cardholder_name: params.cardholder_name,
    expiration_date: params.expiration_date,
    cvv: params.cvv,
    user_id,
    balance,
    password: cardPassword,
    card_type: params.card_type
  };

  const responseBalance = await createCard(createCardParams);

  return responseBalance;
};
