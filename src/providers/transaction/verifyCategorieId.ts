import { HttpStatusError } from "../../error";
import { getCategoriePerId } from "../../repositories";

const verifyCategorieId = async (id: number) => {
  const response = await getCategoriePerId(id);

  if (!response) {
    throw new HttpStatusError("Categorie not found", 404);
  }
};

export default verifyCategorieId;
