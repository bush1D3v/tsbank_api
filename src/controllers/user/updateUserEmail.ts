import { Request, Response } from "express";
import { handleError } from "../../error";
import { UpdateUserMailParams } from "../../models";
import { updateEmailAndConfirm } from "../../services";

export default async function updateUserEmail(req: Request, res: Response) {
  try {
    const { password, new_email } = req.body as UpdateUserMailParams;

    const user = {
      password,
      new_email
    };

    await updateEmailAndConfirm(req, user);

    res.status(201).json({
      "message": "Your email has been changed successfully"
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
