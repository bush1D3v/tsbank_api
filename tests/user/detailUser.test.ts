import request from "supertest";
import server from "../../src/server";
import { loginUser, user } from "../models";
import {
  deleteUser,
  insertUserAndLogin,
  unauthUser
} from "../functions";

let bearerToken: string | undefined;
let response: request.Response;

const detailUser = async (token: string | undefined) => {
  response = await request(server)
    .get("/user")
    .set("Authorization", `Bearer ${token}`)
    .send();

  return response;
};

describe("Detail User Controller Tests", () => {
  beforeAll(async () => {
    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Detail a user successfully", async () => {
    await detailUser(bearerToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", user.name);
    expect(response.body).toHaveProperty("email", user.email);
    expect(response.body).toHaveProperty("cpf", user.cpf);
    expect(response.body).toHaveProperty("phone", user.phone);
    expect(response.body).toHaveProperty("balance");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await detailUser(errorToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await detailUser(errorToken);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("get", server, "user");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, user.password);
    await detailUser(bearerToken);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });
});
