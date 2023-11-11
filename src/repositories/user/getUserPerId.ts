import db from "../../data/connection";
import { HttpStatusError } from "../../error";
import { DatabaseUserParams } from "../../models";

export default async function getUserPerId(id: number) {
  const user: DatabaseUserParams = await db("users").where({ id }).first();

  if (typeof user === "undefined") {
    throw new HttpStatusError("user not found", 404);
  }

  return user;
};
