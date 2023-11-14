import { Request, Response } from "express";
import { handleError } from "../../error";
import { insertCardAndReturn } from "../../services";
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

    const balance = await insertCardAndReturn(req, params);

    if (typeof balance === "number" && balance >= 0) {
      return res.status(201).json({
        message: `${card_type.toLowerCase()} card added successfully. Your credit limit is: ${balance}`
      });
    } else {
      return res.status(201).json({
        message: `${card_type.toLowerCase()} card added successfully`
      });
    }
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
