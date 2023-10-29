import db from "../../data/connection";

export default async function eraseUser(id: number) {
  await db("users").delete().where({ id });
}
