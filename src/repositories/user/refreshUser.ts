import db from "../../data/connection";
import { ReturnedDatabaseUserParams, RefreshUserParams } from "../../models";

export default async function refreshUser(params: RefreshUserParams, id: number) {
  const newUser: ReturnedDatabaseUserParams[] = await db("users").update({
    email: params.new_email,
    password: params.new_password,
    phone: params.new_phone
  }).where({ id }).returning([ "id", "name", "email" ]);

  return newUser[ 0 ];
};
