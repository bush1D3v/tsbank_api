import db from "../../data/connection";

export default async function createNewDeposit(id: number, value: number) {
  await db("users").increment({ "balance": value }).where({ id });
}
