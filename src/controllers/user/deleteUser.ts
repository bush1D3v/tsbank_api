import { Request, Response } from "express";
import { handleError } from "../../error";
import { deleteUserAndConfirm } from "../../services";
import { DeleteUserParams } from "../../models";

export default async function deleteUser(req: Request, res: Response) {
  try {
    const { password } = req.body as DeleteUserParams;

    await deleteUserAndConfirm(req, password);

    return res.json({
      "message": "your account has been deleted"
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
