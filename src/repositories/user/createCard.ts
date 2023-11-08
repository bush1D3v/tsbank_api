import db from "../../data/connection";
import { InsertCardParams } from "../../models";

type Balance = {
  balance: number
}

export default async function createCard(params: InsertCardParams) {
  if (params.card_type.toLowerCase() === "credit") {
    const value: Balance[] = await db("credit_cards").insert({
      card_number: params.card_number,
      cardholder_name: params.cardholder_name,
      expiration_date: params.expiration_date,
      cvv: params.cvv,
      user_id: params.user_id,
      balance: params.balance,
      password: params.password
    }).returning("balance");

    return value[ 0 ].balance;
  } else if (params.card_type.toLowerCase() === "debit") {
    await db("debit_cards").insert({
      card_number: params.card_number,
      cardholder_name: params.cardholder_name,
      expiration_date: params.expiration_date,
      cvv: params.cvv,
      user_id: params.user_id,
      password: params.password
    });
  }
};
