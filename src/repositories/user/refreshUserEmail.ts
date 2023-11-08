import db from "../../data/connection";

type EmailDate = {
  email: string
}

export default async function refreshUserEmail(id: number, new_email: string) {
  const returnedEmail: EmailDate[] = await db("users").update({ "email": new_email })
    .where({
      id
    }).returning([ "email" ]);

  return returnedEmail[ 0 ];
};
