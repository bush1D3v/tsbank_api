import db from "../src/data/connection";

beforeEach(async () => {
  await db("users").delete("*");
  await db("transactions").delete("*");
});

afterAll(async () => {
  await db.destroy();
});
