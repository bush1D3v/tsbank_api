import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";

const validateEmail = async (email: string) => {
  const user: DatabaseUserParams = await db("users").where({ email }).first();

  return user;
};

export default validateEmail;
