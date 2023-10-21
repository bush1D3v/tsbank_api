import { Request, Response } from "express";
import { handleError } from "../../utils";
import { updateUserAndReturn } from "../../services";

const updateUser = async (req: Request, res: Response) => {
  try {
    const newUser = await updateUserAndReturn(req.body, req);

    return res.status(201).json(newUser);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

export default updateUser;
