import { Request, Response } from "express";
import { handleError } from "../../error";
import { deleteUserAndConfirm } from "../../services";

export default async function deleteUser(req: Request, res: Response) {
  try {
    const { password } = req.body;

    await deleteUserAndConfirm(req, password);

    return res.json({
      "message": "Your account has been deleted"
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
