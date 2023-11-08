import { Request, Response } from "express";
import { handleError } from "../../error";
import { UpdateCardPasswordParams } from "../../models";
import { updateCardPasswordAndConfirm } from "../../services";

export default async function updateCardPassword(req: Request, res: Response) {
  try {
    const { card_type, password, new_password } = req.body as UpdateCardPasswordParams;

    const params = {
      card_type,
      password,
      new_password
    };

    await updateCardPasswordAndConfirm(req, params);

    return res.status(201).json({
      message: `Password of your ${card_type.toLowerCase()} card has been updated successfully`
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
