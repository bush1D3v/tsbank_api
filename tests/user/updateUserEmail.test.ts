import request from "supertest";
import server from "../../src/server";
import { loginUser, user } from "../models";
import {
  deleteUser,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type UpdateEmailUserTestParams = {
  new_email: string | null;
  password: string | null;
};

let updatedEmailUser: UpdateEmailUserTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const updateEmailUser = async (token: string | undefined, user: UpdateEmailUserTestParams) => {
  response = await request(server)
    .patch("/email")
    .set("Authorization", `Bearer ${token}`)
    .send(user);

  return response;
};

describe("Update User Email Controller Tests", () => {
  beforeEach(async () => {
    updatedEmailUser = {
      "new_email": "victorjln2@gmail.com",
      "password": "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Update a email successfully", async () => {
    await updateEmailUser(bearerToken, updatedEmailUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", `your email has been changed successfully, now is '${updatedEmailUser.new_email}'`);
  });

  it("Email must be a valid email", async () => {
    updatedEmailUser.new_email = "victorjln@";

    await updateEmailUser(bearerToken, updatedEmailUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "new_email must be a valid email");
  });

  it("This email already used per other user", async () => {
    await updateEmailUser(bearerToken, updatedEmailUser);

    await updateEmailUser(bearerToken, updatedEmailUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this email already used per other user");
  });

  it("Password must be at least 8 characters", async () => {
    updatedEmailUser.password = "vtjln12";

    await updateEmailUser(bearerToken, updatedEmailUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Invalid password", async () => {
    updatedEmailUser.password = "vtjln321";

    await updateEmailUser(bearerToken, updatedEmailUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await updateEmailUser(errorToken, updatedEmailUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await updateEmailUser(errorToken, updatedEmailUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("patch", server, "email");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, updatedEmailUser.password);
    await updateEmailUser(bearerToken, updatedEmailUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    updatedEmailUser.password = null;

    await updateEmailUser(bearerToken, updatedEmailUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });

  afterEach(async () => {
    await deleteUser(bearerToken, updatedEmailUser.password);
  });
});
