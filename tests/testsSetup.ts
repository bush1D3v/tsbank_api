import db from "../src/data/connection";
import server from "../src/server";

afterAll(async () => {
  await db("users").delete("*");
  await db("transactions").delete("*");
  await db("credit_cards").delete("*");
  await db("debit_cards").delete("*");
  await db.destroy();
  server.close();
});
