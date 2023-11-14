import request from "supertest";
import server from "../../src/server";
import {
  deposit,
  loginUser,
  loginUser2,
  user,
  user2
} from "../models";
import {
  deleteUser,
  insertDeposit,
  insertUserAndLogin,
  unauthUser
} from "../functions";

let bearerToken: string | undefined;
let response: request.Response;

const detailTransaction = async (token: string | undefined, id: string) => {
  response = await request(server)
    .get(`/transaction/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send();

  return response;
};

describe("Detail Transaction Controller Tests", () => {
  beforeEach(async () => {
    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Detail a transaction successfully", async () => {
    const identifier = await insertDeposit(bearerToken, deposit);

    await detailTransaction(bearerToken, identifier.body.id);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", identifier.body.id);
    expect(response.body).toHaveProperty("description", identifier.body.description);
    expect(response.body).toHaveProperty("value", identifier.body.value);
    expect(response.body).toHaveProperty("date", identifier.body.date);
    expect(response.body).toHaveProperty("user_id", identifier.body.user_id);
    expect(response.body).toHaveProperty("type", identifier.body.type);
  });

  it("Invalid value of 'id' parameter", async () => {
    await detailTransaction(bearerToken, "a");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "invalid value of 'id' parameter");
  });

  it("Transaction not found", async () => {
    bearerToken = await insertUserAndLogin(user2, loginUser2);
    await detailTransaction(bearerToken, "0");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "transaction not found");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await detailTransaction(errorToken, "0");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await detailTransaction(errorToken, "0");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("get", server, "transaction/id");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await detailTransaction(bearerToken, "0");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });
});
