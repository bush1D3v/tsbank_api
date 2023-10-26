import { Request, Response } from "express";
import { handleError } from "../../error";
import { getUserDetailsAndReturn } from "../../services";

const detailUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserDetailsAndReturn(req);

    return res.json(user);
  } catch (error: any) {
    handleError(res, error, 400);
  }
};

export default detailUser;
