import request from "supertest";
import server from "../../src/server";
import { loginUser, user } from "../models";
import {
  deleteUser,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type InsertDepositTestParams = {
  value: number | null;
  email: string | null;
  password: string | null;
};

let insertedDeposit: InsertDepositTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const insertDeposit = async (token: string | undefined, deposit: InsertDepositTestParams) => {
  response = await request(server)
    .post("/deposit")
    .set("Authorization", `Bearer ${token}`)
    .send(deposit);
};

describe("Insert Deposit Controller Tests", () => {
  beforeEach(async () => {
    insertedDeposit = {
      "value": 30000,
      "email": "victorjln@gmail.com",
      "password": "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Insert a deposit successfully", async () => {
    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", "deposit");
    expect(response.body).toHaveProperty("value", insertedDeposit.value);
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("type", "input");
  });

  it("Value must be greater than or equal to 0.1", async () => {
    insertedDeposit.value = 0;

    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "value must be greater than or equal to 0.1");
  });

  it("Email must be a valid email", async () => {
    insertedDeposit.email = "victorjln@";

    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email must be a valid email");
  });

  it("Email not found", async () => {
    insertedDeposit.email = "victorjln2@gmail.com";

    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "email not found");
  });

  it("Invalid password", async () => {
    insertedDeposit.password = "vtjln321";

    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Password must be at least 8 characters", async () => {
    insertedDeposit.password = "vtjln12";

    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await insertDeposit(errorToken, insertedDeposit);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await insertDeposit(errorToken, insertedDeposit);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("post", server, "deposit");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    insertedDeposit.password = null;

    await insertDeposit(bearerToken, insertedDeposit);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
