import { Request, Response } from "express";
import { handleError } from "../../error";
import { updatePhoneAndReturn } from "../../services";
import { UpdateUserPhoneParams } from "../../models";

export default async function updateUserPhone(req: Request, res: Response) {
  try {
    const { password, new_phone } = req.body as UpdateUserPhoneParams;

    const params = {
      password,
      new_phone
    };

    const { phone } = await updatePhoneAndReturn(req, params);

    return res.status(201).json({
      "message": `Your phone has been changed successfully, now is '${phone}'`
    });
  } catch (error: any) {
    handleError(res, error, 400);
  }
};
