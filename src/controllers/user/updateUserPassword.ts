import { Request, Response } from "express";
import { handleError } from "../../error";
import { UpdateUserPasswordParams } from "../../models";
import { updatePasswordAndConfirm } from "../../services";

export default async function updateUserPassword(req: Request, res: Response) {
  try {
    const { password, new_password } = req.body as UpdateUserPasswordParams;

    const params = {
      password,
      new_password
    };

    await updatePasswordAndConfirm(req, params);

    return res.status(201).json({
      "message": "your password has been changed successfully"
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
