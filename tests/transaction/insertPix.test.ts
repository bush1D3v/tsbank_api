import request from "supertest";
import server from "../../src/server";
import {
  deposit,
  loginUser, loginUser2,
  user,
  user2
} from "../models";
import {
  insertDeposit,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type InsertPixTestParams = {
  password: string | null;
  cpf: string | null;
  value: number | null;
};

let insertedPix: InsertPixTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const insertPix = async (token: string | undefined, pix: InsertPixTestParams) => {
  response = await request(server)
    .post("/pix")
    .set("Authorization", `Bearer ${token}`)
    .send(pix);

  return response;
};

describe("Insert Pix Controller Tests", () => {
  beforeEach(async () => {
    insertedPix = {
      "value": 30000,
      "cpf": "12345678921",
      "password": "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  beforeAll(async () => {
    await insertUserAndLogin(user2, loginUser2);
  });

  it("Insert a pix successfully", async () => {
    await insertDeposit(bearerToken, deposit);
    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", "pix");
    expect(response.body).toHaveProperty("value", insertedPix.value);
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("type", "output");
  });

  it("Insufficient balance to perform the transaction", async () => {
    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "insufficient balance to perform the transaction");
  });

  it("Value must be greater than or equal to 0.01", async () => {
    insertedPix.value = 0;

    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "value must be greater than or equal to 0.01");
  });

  it("Cpf must be at least 11 characters", async () => {
    insertedPix.cpf = "1234567891";

    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "cpf must be at least 11 characters");
  });

  it("User not found", async () => {
    insertedPix.cpf = "12121212121";

    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Invalid password", async () => {
    insertedPix.password = "vtjln321";

    await insertDeposit(bearerToken, deposit);
    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Password must be at least 8 characters", async () => {
    insertedPix.password = "vtjln12";

    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await insertPix(errorToken, insertedPix);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await insertPix(errorToken, insertedPix);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("post", server, "pix");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("Some request field missing", async () => {
    insertedPix.password = null;

    await insertPix(bearerToken, insertedPix);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
