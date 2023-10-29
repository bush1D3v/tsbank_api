import db from "../../data/connection";

export default async function refreshUserEmail(password: string, new_email: string) {
  await db("users").update({ "email": new_email })
    .where({
      password
    });
};
