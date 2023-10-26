import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";
import { undefinedUser } from "../../providers";

const getUserPerId = async (id: number) => {
  const user: DatabaseUserParams = await db("users").where({ id }).first();

  undefinedUser(user);

  const { password: _, ...userResponse } = user;

  return userResponse;
};

export default getUserPerId;
