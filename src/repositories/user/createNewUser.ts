import db from "../../data/connection";

const createNewUser = async (params: string[]) => {
  const user = await db("users")
    .insert({
      name: params[ 0 ],
      email: params[ 1 ],
      password: params[ 2 ]
    })
    .returning([ "id", "name", "email" ]);

  return user[ 0 ];
};

export default createNewUser;
