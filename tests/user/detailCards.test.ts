import request from "supertest";
import server from "../../src/server";
import {
  insertUserAndLogin,
  unauthUser,
  deleteUser,
  insertCard,
  deleteCard
} from "../functions";
import {
  user,
  credit,
  debit,
  loginUser,
} from "../models";

let bearerToken: string | undefined;
let response: request.Response;

const detailCards = async (token: string | undefined) => {
  response = await request(server)
    .get("/card")
    .set("Authorization", `Bearer ${token}`)
    .send();

  return response;
};

describe("Detail a User Cards Controller Tests", () => {
  beforeAll(async () => {
    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Detail a user cards successfully", async () => {
    await insertCard(bearerToken, credit);
    await insertCard(bearerToken, debit);
    await detailCards(bearerToken);

    expect(response.status).toBe(200);
    expect(response.body[ 0 ]).toHaveProperty("credit");
    expect(response.body[ 1 ]).toHaveProperty("debit");
  });

  it("This user does not have a card", async () => {
    await deleteCard("credit");
    await deleteCard("debit");
    await detailCards(bearerToken);

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("message", "this user does not have a card");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await detailCards(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await detailCards(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("get", server, "card");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await detailCards(bearerToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  afterEach(async () => {
    await deleteCard("credit");
    await deleteCard("debit");
  });
});
