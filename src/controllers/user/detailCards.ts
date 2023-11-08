import { Request, Response } from "express";
import { handleError } from "../../error";
import { detailCardsAndReturn } from "../../services";

export default async function detailCards(req: Request, res: Response) {
  try {
    const cards = await detailCardsAndReturn(req);

    return res.json(cards);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
