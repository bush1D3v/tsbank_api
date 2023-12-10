import request from "supertest";
import server from "../../src/server";
import {
  user,
  user2,
  loginUser,
  loginUser2
} from "../models";
import {
  deleteCard,
  deleteUser,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type InsertCardTestParams = {
  card_number: string | null;
  cardholder_name: string | null;
  expiration_date: string | null;
  cvv: string | null;
  password: string | null;
  card_type: string | null;
};

let insertedCard: InsertCardTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const insertCard = async (token: string | undefined, card: InsertCardTestParams) => {
  response = await request(server)
    .post("/card")
    .set("Authorization", `Bearer ${token}`)
    .send(card);

  return response;
};

describe("Insert Card Controller Tests", () => {
  beforeEach(async () => {
    insertedCard = {
      "card_number": "1234567812345678",
      "cardholder_name": "Victor Navarro",
      "expiration_date": "12/31",
      "cvv": "123",
      "password": "123456",
      "card_type": "credit"
    };
  });

  beforeAll(async () => {
    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Insert a card successfully", async () => {
    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "credit card added successfully. Your credit limit is: 0");
  });

  it("Cardholder_name must be at least 10 characters", async () => {
    insertedCard.cardholder_name = "victor jl";

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "cardholder_name must be at least 10 characters");
  });

  it("Card_number must be at least 16 characters", async () => {
    insertedCard.card_number = "123456788765432";

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "card_number must be at least 16 characters");
  });

  it("This user already have a credit card", async () => {
    await insertCard(bearerToken, insertedCard);
    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this user already have a credit card");
  });

  it("This credit card already used per other user", async () => {
    await insertCard(bearerToken, insertedCard);

    bearerToken = await insertUserAndLogin(user2, loginUser2);

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this credit card already used per other user");
  });

  it("This user already have a credit card", async () => {
    await insertCard(bearerToken, insertedCard);
    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this user already have a credit card");
  });

  it("Date must be a `date` type, but the final value was: `Invalid Date`", async () => {
    insertedCard.expiration_date = "14/14";

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "expiration_date must be a `date` type, but the final value was: `Invalid Date` (cast from the value `\"14/14\"`).");
  });

  it("Cvv must be at least 3 characters", async () => {
    insertedCard.cvv = "18";

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "cvv must be at least 3 characters");
  });

  it("Password must be at least 4 characters", async () => {
    insertedCard.password = "vtj";

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 4 characters");
  });

  it("Invalid value of 'Card Type'", async () => {
    insertedCard.card_type = "bedit";

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "invalid value of 'Card Type'");
  });

  it("Jwt mal formed", async () => {
    let errorToken;
    await insertCard(errorToken, insertedCard);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await insertCard(errorToken, insertedCard);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("post", server, "card");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("Some request field missing", async () => {
    insertedCard.password = null;

    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await insertCard(bearerToken, insertedCard);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  afterEach(async () => {
    if (insertedCard.card_type?.toLowerCase() === "credit" || insertedCard.card_type?.toLowerCase() === "debit") {
      await deleteCard(insertedCard.card_type);
    }
  });
});
