import db from "../../data/connection";

export default async function createNewDeposit(email: string, value: number) {
  await db("users").increment({ "balance": value }).where({ email });
};
