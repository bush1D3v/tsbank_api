import db from "../../data/connection";
import { UserParams } from "../../models";

const createNewUser = async (params: UserParams) => {
  const user = await db("users")
    .insert({
      name: params[ "name" ],
      email: params[ "email" ],
      password: params[ "password" ]
    })
    .returning([ "id", "name", "email" ]).first();

  return user;
};

export default createNewUser;
