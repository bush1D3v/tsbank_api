import db from "../../data/connection";

const validateEmail = async (email: string) => {
  const user = await db("users").where({ email }).first();

  return user;
};

export default validateEmail;
