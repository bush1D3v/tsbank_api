import { Request } from "express";
import { HttpStatusError } from "../../error";
import { getCategoriePerId } from "../../repositories";

const verifyCategorieId = async (req: Request) => {
  const { categorie_id } = req.body;
  const response = await getCategoriePerId(categorie_id);

  if (!response) {
    throw new HttpStatusError("Categorie not found", 404);
  }
};

export default verifyCategorieId;
