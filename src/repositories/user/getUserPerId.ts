import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";

const getUserPerId = async (id: number) => {
  const user: DatabaseUserParams = await db("users").where({ id }).first();

  const { password: _, ...userResponse } = user;

  return userResponse;
};

export default getUserPerId;
