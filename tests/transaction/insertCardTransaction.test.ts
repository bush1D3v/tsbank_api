import request from "supertest";
import server from "../../src/server";
import {
  debit,
  deposit,
  loginUser,
  user
} from "../models";
import {
  deleteCard,
  deleteUser,
  insertCard,
  insertDeposit,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type InsertCardTransactionTestParams = {
  password: string | null;
  card_type: string | null;
  value: number | null;
};

let insertedCardTransaction: InsertCardTransactionTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const insertCardTransaction = async (token: string | undefined, transaction: InsertCardTransactionTestParams) => {
  response = await request(server)
    .post("/transaction/card")
    .set("Authorization", `Bearer ${token}`)
    .send(transaction);

  return response;
};

describe("Insert Card Transaction Controller Tests", () => {
  beforeEach(async () => {
    insertedCardTransaction = {
      "value": 30000,
      "card_type": "debit",
      "password": "123456"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Insert a card transaction successfully", async () => {
    await insertCard(bearerToken, debit);
    await insertDeposit(bearerToken, deposit);
    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", insertedCardTransaction.card_type);
    expect(response.body).toHaveProperty("value", insertedCardTransaction.value);
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("type", "output");
  });

  it("Insufficient balance to perform the transaction", async () => {
    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "insufficient balance to perform the transaction");
  });

  it("Value must be greater than or equal to 0.01", async () => {
    insertedCardTransaction.value = 0;

    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "value must be greater than or equal to 0.01");
  });

  it("Invalid password", async () => {
    insertedCardTransaction.password = "1234";

    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Password must be at least 4 characters", async () => {
    insertedCardTransaction.password = "vtj";

    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 4 characters");
  });

  it("Invalid value of 'Card Type'", async () => {
    insertedCardTransaction.card_type = "bedit";

    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "invalid value of 'Card Type'");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await insertCardTransaction(errorToken, insertedCardTransaction);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await insertCardTransaction(errorToken, insertedCardTransaction);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("post", server, "transaction/card");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("Some request field missing", async () => {
    insertedCardTransaction.password = null;

    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });

  it("This user not have a credit/debit card", async () => {
    await deleteCard(insertedCardTransaction.card_type);

    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", `this user not have a ${insertedCardTransaction.card_type?.toLowerCase()} card`);
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await insertCardTransaction(bearerToken, insertedCardTransaction);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });
});
