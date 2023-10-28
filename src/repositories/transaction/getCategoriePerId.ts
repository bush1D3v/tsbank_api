import db from "../../data/connection";

export default async function getCategoriePerId(id: number) {
  const response: string = await db("categories")
    .where({ id })
    .select("description")
    .first();

  return response;
};
