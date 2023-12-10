import request from "supertest";
import server from "../../src/server";
import {
  credit,
  loginUser,
  user
} from "../models";
import {
  deleteCard,
  deleteUser,
  insertCard,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type UpdateCardPasswordTestParams = {
  "password": string | null;
  "new_password": string | null;
  "card_type": string | null;
};

let updatedCardPassword: UpdateCardPasswordTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const updateCardPassword = async (token: string | undefined, card: UpdateCardPasswordTestParams) => {
  response = await request(server)
    .patch("/card")
    .set("Authorization", `Bearer ${token}`)
    .send(card);

  return response;
};

describe("Update Card Password Controller Tests", () => {
  beforeEach(async () => {
    updatedCardPassword = {
      password: "123456",
      new_password: "654321",
      card_type: "credit"
    };
  });

  beforeAll(async () => {
    bearerToken = await insertUserAndLogin(user, loginUser);

    await insertCard(bearerToken, credit);
  });

  it("Update a card password successfully", async () => {
    await updateCardPassword(bearerToken, updatedCardPassword);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "password of your credit card has been updated successfully");
  });

  it("Invalid password", async () => {
    updatedCardPassword.password = "546783";

    await updateCardPassword(bearerToken, updatedCardPassword);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Password must be at least 4 characters", async () => {
    updatedCardPassword.new_password = "vtj";

    await updateCardPassword(bearerToken, updatedCardPassword);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "new_password must be at least 4 characters");
  });

  it("Invalid value of 'Card Type'", async () => {
    updatedCardPassword.card_type = "bedit";

    await updateCardPassword(bearerToken, updatedCardPassword);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "invalid value of 'Card Type'");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await updateCardPassword(errorToken, updatedCardPassword);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await updateCardPassword(errorToken, updatedCardPassword);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("patch", server, "card");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("Some request field missing", async () => {
    updatedCardPassword.password = null;

    await updateCardPassword(bearerToken, updatedCardPassword);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });

  it("This user not have a credit/debit card", async () => {
    await deleteCard(updatedCardPassword.card_type);

    await updateCardPassword(bearerToken, updatedCardPassword);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", `this user not have a ${updatedCardPassword.card_type?.toLowerCase()} card`);
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await updateCardPassword(bearerToken, updatedCardPassword);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });
});
