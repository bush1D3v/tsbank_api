import db from "../../data/connection";
import { ReturnedDatabaseUserParams, LoginUserParams } from "../../models";

export default async function refreshUser(params: LoginUserParams, id: number) {
  const newUser: ReturnedDatabaseUserParams[] = await db("users").update({
    email: params.email,
    password: params.password
  }).where({ id }).returning([ "id", "name", "email" ]);

  return newUser[ 0 ];
};
