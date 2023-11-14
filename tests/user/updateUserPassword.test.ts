import request from "supertest";
import server from "../../src/server";
import { loginUser, user } from "../models";
import {
  deleteUser,
  insertUserAndLogin,
  unauthUser
} from "../functions";

type UpdatePasswordUserTestParams = {
  password: string | null;
  new_password: string | null;
};

let updatedPasswordUser: UpdatePasswordUserTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const updatePasswordUser = async (token: string | undefined, user: UpdatePasswordUserTestParams) => {
  response = await request(server)
    .patch("/password")
    .set("Authorization", `Bearer ${token}`)
    .send(user);

  return response;
};

describe("Update User Password Controller Tests", () => {
  beforeEach(async () => {
    updatedPasswordUser = {
      "new_password": "vtjln321",
      "password": "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Update a password successfully", async () => {
    await updatePasswordUser(bearerToken, updatedPasswordUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "your password has been changed successfully");
  });

  it("Password must be at least 8 characters", async () => {
    updatedPasswordUser.password = "vtjln12";

    await updatePasswordUser(bearerToken, updatedPasswordUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Invalid password", async () => {
    updatedPasswordUser.password = "vtjln312";

    await updatePasswordUser(bearerToken, updatedPasswordUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await updatePasswordUser(errorToken, updatedPasswordUser);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await updatePasswordUser(errorToken, updatedPasswordUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("patch", server, "password");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, updatedPasswordUser.password);
    await updatePasswordUser(bearerToken, updatedPasswordUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    updatedPasswordUser.password = null;

    await updatePasswordUser(bearerToken, updatedPasswordUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });

  afterEach(async () => {
    await deleteUser(bearerToken, updatedPasswordUser.new_password);
  });
});
