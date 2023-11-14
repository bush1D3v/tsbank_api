import request from "supertest";
import server from "../../src/server";
import { loginUser, user } from "../models";
import {
  deleteUser,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type InsertTransaction = {
  type: string | null;
  description: string | null;
  value: number | null;
};

let insertedTransaction: InsertTransaction;
let bearerToken: string | undefined;
let response: request.Response;

const insertTransaction = async (token: string | undefined, transaction: InsertTransaction) => {
  response = await request(server)
    .post("/transaction")
    .set("Authorization", `Bearer ${token}`)
    .send(transaction);
};

describe("Insert Transaction Controller Tests", () => {
  beforeEach(async () => {
    insertedTransaction = {
      "type": "input",
      "description": "credit",
      "value": 300000
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Insert a deposit successfully", async () => {
    await insertTransaction(bearerToken, insertedTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", insertedTransaction.description);
    expect(response.body).toHaveProperty("value", insertedTransaction.value);
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("type", insertedTransaction.type);
  });

  it("Value must be greater than or equal to 0.1", async () => {
    insertedTransaction.value = 0;

    await insertTransaction(bearerToken, insertedTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "value must be greater than or equal to 0.1");
  });

  it("Invalid value of type", async () => {
    insertedTransaction.type = "";

    await insertTransaction(bearerToken, insertedTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "invalid value of 'type'");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await insertTransaction(errorToken, insertedTransaction);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await insertTransaction(errorToken, insertedTransaction);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("post", server, "transaction");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await insertTransaction(bearerToken, insertedTransaction);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    insertedTransaction.description = null;

    await insertTransaction(bearerToken, insertedTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "description is a required field");
  });
});
