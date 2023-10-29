import db from "../../data/connection";

export default async function refreshUserPassword(password: string, new_password: string) {
  await db("users").update({ "password": new_password })
    .where({
      password
    });
};
