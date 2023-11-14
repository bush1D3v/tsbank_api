import { Request, Response } from "express";
import { handleError } from "../../error";
import { UpdateUserEmailParams } from "../../models";
import { updateEmailAndReturn } from "../../services";

export default async function updateUserEmail(req: Request, res: Response) {
  try {
    const { password, new_email } = req.body as UpdateUserEmailParams;

    const user = {
      password,
      new_email
    };

    const { email } = await updateEmailAndReturn(req, user);

    res.status(201).json({
      "message": `your email has been changed successfully, now is '${email}'`
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
