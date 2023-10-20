import db from "../../data/connection";
import { DatabaseParams } from "../../models";

const getUserPerId = async (id: number) => {
  const user: DatabaseParams = await db("users").where({ id }).first();

  const { password: _, ...userResponse } = user;

  return userResponse;
};

export default getUserPerId;
