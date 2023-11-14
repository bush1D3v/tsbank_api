import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";

export default async function getUserPerId(id: number) {
  const user: DatabaseUserParams = await db("users").where({ id }).first();

  return user;
};
