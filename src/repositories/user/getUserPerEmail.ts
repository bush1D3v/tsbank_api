import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";

export default async function getUserPerEmail(email: string) {
  const user: DatabaseUserParams = await db("users").where({ email }).first();

  return user;
};
