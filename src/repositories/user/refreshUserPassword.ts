import db from "../../data/connection";

export default async function refreshUserPassword(id: number, new_password: string) {
  await db("users").update({ "password": new_password })
    .where({
      id
    });
};
