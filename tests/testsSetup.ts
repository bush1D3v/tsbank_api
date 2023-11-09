import db from "../src/data/connection";

beforeEach(async () => {
  await db("users").delete("*");
  await db("transactions").delete("*");
  await db("credit_cards").delete("*");
  await db("debit_cards").delete("*");
});

afterAll(async () => {
  await db.destroy();
});
