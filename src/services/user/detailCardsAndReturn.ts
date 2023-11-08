import { getToken } from "../../utils";
import { Request } from "express";
import { getCardsPerUserId } from "../../repositories";

export default async function detailCardsAndReturn(req: Request) {
  const userId = getToken(req);

  const { credit, debit } = await getCardsPerUserId(userId);

  const cards = [];

  if (credit) {
    const { password: _, ...creditResponse } = credit;
    cards.push({
      credit: creditResponse
    });
  }

  if (debit) {
    const { password: _, balance: z, ...debitResponse } = debit;
    cards.push({
      debit: debitResponse
    });
  }

  return cards;
};
