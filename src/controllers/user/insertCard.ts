import { Request, Response } from "express";
import { handleError } from "../../error";
import { insertCardAndConfirm } from "../../services";
import { CardParams } from "../../models";

export default async function insertCard(req: Request, res: Response) {
  try {
    const {
      card_number,
      cardholder_name,
      expiration_date,
      cvv,
      password,
      card_type
    } = req.body as CardParams;

    const params = {
      card_number,
      cardholder_name,
      expiration_date,
      cvv,
      password,
      card_type
    };

    const balance = await insertCardAndConfirm(req, params);

    if (balance) {
      return res.status(201).json({
        message: `${card_type} card added succesfully. Your credit limit is: ${balance}`
      });
    } else {
      return res.status(201).json({
        message: `${card_type} card added succesfully`
      });
    }
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
