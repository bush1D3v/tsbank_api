import { HttpStatusError } from "../../error";
import { getCategoriePerId } from "../../repositories";

export default async function verifyCategorieId(id: number) {
  const response = await getCategoriePerId(id);

  if (!response) {
    throw new HttpStatusError("Categorie not found", 404);
  }
};
