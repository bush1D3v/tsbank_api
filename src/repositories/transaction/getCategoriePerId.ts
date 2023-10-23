import db from "../../data/connection";

const getCategoriePerId = async (id: number) => {
  const response = await db("categories")
    .where({ id })
    .select("description")
    .first();

  return response;
};

export default getCategoriePerId;
