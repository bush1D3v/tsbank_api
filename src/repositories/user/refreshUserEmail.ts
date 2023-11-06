import db from "../../data/connection";

type EmailDate = {
  email: string
}

export default async function refreshUserEmail(password: string, new_email: string) {
  const returnedEmail: EmailDate[] = await db("users").update({ "email": new_email })
    .where({
      password
    }).returning([ "email" ]);

  return returnedEmail[ 0 ];
};
