import request from "supertest";
import server from "../../src/server";
import {
  credit,
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

type MakeCardPayTestParams = {
  password: string | null;
  value: number | null;
};

let makedCardPay: MakeCardPayTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const makeCardPay = async (token: string | undefined, payment: MakeCardPayTestParams) => {
  response = await request(server)
    .post("/card/pay")
    .set("Authorization", `Bearer ${token}`)
    .send(payment);

  return response;
};

describe("Make Card Payment Controller Tests", () => {
  beforeEach(async () => {
    makedCardPay = {
      "value": 30000,
      "password": "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Make a card payment successfully", async () => {
    await insertCard(bearerToken, credit);
    await insertDeposit(bearerToken, deposit);
    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", "card pay");
    expect(response.body).toHaveProperty("value", makedCardPay.value);
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("type", "output");
  });

  it("Invalid password", async () => {
    makedCardPay.password = "vtjln321";

    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Password must be at least 8 characters", async () => {
    makedCardPay.password = "vtjln12";

    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Insufficient balance to perform the transaction", async () => {
    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "insufficient balance to perform the transaction");
  });

  it("Value must be greater than or equal to 0.01", async () => {
    makedCardPay.value = 0;

    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "value must be greater than or equal to 0.01");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await makeCardPay(errorToken, makedCardPay);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await makeCardPay(errorToken, makedCardPay);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("post", server, "card/pay");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("Some request field missing", async () => {
    makedCardPay.password = null;

    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });

  it("This user not have a credit/debit card", async () => {
    await deleteCard("credit");

    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "this user not have a credit card");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await makeCardPay(bearerToken, makedCardPay);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });
});
