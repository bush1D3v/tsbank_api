import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";

export default async function validatePhone(phone: string) {
  const user: DatabaseUserParams = await db("users").where({ phone }).first();

  return user;
};
