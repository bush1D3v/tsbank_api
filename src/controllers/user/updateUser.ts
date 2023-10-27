import { Request, Response } from "express";
import { handleError } from "../../error";
import { updateUserAndReturn } from "../../services";

const updateUser = async (req: Request, res: Response) => {
  try {
    const newUser = await updateUserAndReturn(req, req.body);

    return res.json(newUser);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

export default updateUser;
