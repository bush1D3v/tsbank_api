import { Request, Response } from "express";
import { handleError } from "../../error";
import { updateUserAndReturn } from "../../services";
import { UpdateUserParams } from "../../models";

export default async function updateUser(req: Request, res: Response) {
  try {
    const {
      password,
      new_password,
      new_email,
      new_phone
    } = req.body as UpdateUserParams;

    const params = {
      password,
      new_password,
      new_email,
      new_phone
    };

    const newUser = await updateUserAndReturn(req, params);

    return res.json(newUser);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
