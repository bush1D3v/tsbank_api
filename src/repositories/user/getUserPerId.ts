import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";
import { undefinedUser } from "../../providers";

export default async function getUserPerId(id: number) {
  const user: DatabaseUserParams = await db("users").where({ id }).first();

  undefinedUser(user);

  const { password: _, ...userResponse } = user;

  return userResponse;
};
