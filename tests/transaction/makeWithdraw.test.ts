import request from "supertest";
import server from "../../src/server";
import {
  deposit,
  loginUser,
  user
} from "../models";
import {
  deleteUser,
  insertDeposit,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type MakeWithdrawTestParams = {
  value: number | null;
  password: string | null;
};

let makedWithdraw: MakeWithdrawTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const makeWithdraw = async (token: string | undefined, withdraw: MakeWithdrawTestParams) => {
  response = await request(server)
    .post("/withdraw")
    .set("Authorization", `Bearer ${token}`)
    .send(withdraw);

  return response;
};

describe("Make Withdraw Controller Tests", () => {
  beforeEach(async () => {
    makedWithdraw = {
      "value": 30000,
      "password": "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Make a withdraw successfully", async () => {
    await insertDeposit(bearerToken, deposit);
    await makeWithdraw(bearerToken, makedWithdraw);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description", "withdraw");
    expect(response.body).toHaveProperty("value", makedWithdraw.value);
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("type", "output");
  });

  it("Insufficient balance to perform the transaction", async () => {
    await makeWithdraw(bearerToken, makedWithdraw);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "insufficient balance to perform the transaction");
  });

  it("Value must be greater than or equal to 0.01", async () => {
    makedWithdraw.value = 0;

    await makeWithdraw(bearerToken, makedWithdraw);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "value must be greater than or equal to 0.01");
  });

  it("Invalid password", async () => {
    makedWithdraw.password = "vtjln321";

    await makeWithdraw(bearerToken, makedWithdraw);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Password must be at least 8 characters", async () => {
    makedWithdraw.password = "vtjln12";

    await makeWithdraw(bearerToken, makedWithdraw);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await makeWithdraw(errorToken, makedWithdraw);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await makeWithdraw(errorToken, makedWithdraw);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("post", server, "withdraw");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await makeWithdraw(bearerToken, makedWithdraw);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    makedWithdraw.password = null;

    await makeWithdraw(bearerToken, makedWithdraw);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
