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

type DeleteTransactionTestParams = {
  password: string;
};

let deletedTransaction: DeleteTransactionTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const deleteTransaction = async (token: string | undefined, id: string, password: DeleteTransactionTestParams) => {
  response = await request(server)
    .delete(`/transaction/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(password);

  return response;
};

describe("Delete Transaction Controller Tests", () => {
  beforeEach(async () => {
    deletedTransaction = {
      password: user.password
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Delete a transaction successfully", async () => {
    const identifier = await insertDeposit(bearerToken, deposit);

    await deleteTransaction(bearerToken, identifier.body.id, deletedTransaction);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "your transaction has been deleted successfully");
  });

  it("Invalid value of 'id' parameter", async () => {
    await deleteTransaction(bearerToken, "a", deletedTransaction);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "invalid value of 'id' parameter");
  });

  it("Transaction not found", async () => {
    bearerToken = await insertUserAndLogin(user2, loginUser2);
    await deleteTransaction(bearerToken, "0", deletedTransaction);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "transaction not found");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await deleteTransaction(errorToken, "0", deletedTransaction);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await deleteTransaction(errorToken, "0", deletedTransaction);

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
    await deleteTransaction(bearerToken, "0", deletedTransaction);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });
});
