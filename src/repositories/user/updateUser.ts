import db from "../../data/connection";
import { UserParams, ReturnedDatabaseUserParams } from "../../models";

export default async function updateUser(params: UserParams, id: number) {
  const newUser: ReturnedDatabaseUserParams[] = await db("users").update({
    name: params.name,
    email: params.email,
    password: params.password
  }).where({ id }).returning([ "id", "name", "email" ]);

  return newUser[ 0 ];
};
