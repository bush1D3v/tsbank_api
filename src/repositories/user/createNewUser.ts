import db from "../../data/connection";
import { ReturnedDatabaseUserParams, UserParams } from "../../models";

export default async function createNewUser(params: UserParams) {
  const user: ReturnedDatabaseUserParams[] = await db("users")
    .insert({
      name: params.name,
      email: params.email,
      password: params.password,
      cpf: params.cpf,
      phone: params.phone
    })
    .returning([ "id", "name", "email" ]);

  return user[ 0 ];
};
