import db from "../../data/connection";
import { UserParams } from "../../models";

const updateUser = async (params: UserParams, id: number) => {
  const newUser = await db("users").update({
    name: params.name,
    email: params.email,
    password: params.password
  }).where({ id }).returning([ "id", "name", "email" ]);

  return newUser[ 0 ];
};

export default updateUser;
