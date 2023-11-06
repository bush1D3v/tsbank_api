import db from "../../data/connection";

type Balance = {
  balance: number;
}

export default async function getBalancePerId(userId: number, data: string) {
  if (data === "users") {
    const { balance }: Balance = await db("users").where({ id: userId })
      .select("balance").first();

    return balance;
  } else {
    const { balance }: Balance = await db("credit_cards").where({ user_id: userId })
      .select("balance").first();

    return balance;
  }
};
