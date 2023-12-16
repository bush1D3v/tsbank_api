import request from "supertest";
import server from "../../src/server";
import {
  deposit,
  loginUser,
  loginUser2,
  user,
  user2,
  withdraw
} from "../models";
import {
  deleteUser,
  insertDeposit,
  insertUserAndLogin,
  makeWithdraw,
  unauthUser
} from "../functions";

let bearerToken: string | undefined;
let response: request.Response;

const getHistory = async (token: string | undefined) => {
  response = await request(server)
    .get("/history")
    .set("Authorization", `Bearer ${token}`)
    .send();

  return response;
};

describe("Get a User Transaction History Controller Tests", () => {
  beforeEach(async () => {
    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Get a user transaction history successfully", async () => {
    await insertDeposit(bearerToken, deposit);
    await makeWithdraw(bearerToken, withdraw);
    await getHistory(bearerToken);

    expect(response.status).toBe(200);
  });

  it("Your account does not have any registered transaction", async () => {
    bearerToken = await insertUserAndLogin(user2, loginUser2);
    await getHistory(bearerToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "your account does not have any registered transaction");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await getHistory(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await getHistory(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("get", server, "history");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await getHistory(bearerToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });
});
