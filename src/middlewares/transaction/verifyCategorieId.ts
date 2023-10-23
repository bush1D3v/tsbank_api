import { Request, Response, NextFunction } from "express";
import { handleError } from "../../utils";
import { getCategoriePerId } from "../../repositories";

const verifyCategorieId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categorie_id } = req.body;
    const response = await getCategoriePerId(categorie_id);

    if (!response) {
      throw new Error("Categorie not found");
    }

    next();
  } catch (error: any) {
    handleError(res, error, 404);
  }
};

export default verifyCategorieId;
