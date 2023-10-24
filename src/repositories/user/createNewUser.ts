import db from "../../data/connection";
import { ReturnedDatabaseUserParams, UserParams } from "../../models";

const createNewUser = async (params: UserParams) => {
  const user: ReturnedDatabaseUserParams[] = await db("users")
    .insert({
      name: params[ "name" ],
      email: params[ "email" ],
      password: params[ "password" ]
    })
    .returning([ "id", "name", "email" ]);

  return user[ 0 ];
};

export default createNewUser;
