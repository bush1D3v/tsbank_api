import request from "supertest";
import server from "../../src/server";
import { insertUserAndLogin, unauthUser } from "../functions";
import { loginUser, user } from "../models";

type DeleteUserTestParams = {
  password: string | null;
};

const deleteUser = async (token: string | undefined, password: string | null) => {
  response = await request(server)
    .delete("/user")
    .set("Authorization", `Bearer ${token}`)
    .send({ password });

  return response;
};

let deletedUser: DeleteUserTestParams;
let bearerToken: string | undefined;
let response: request.Response;

describe("Delete User Controller Tests", () => {
  beforeEach(async () => {
    deletedUser = {
      password: "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Delete a user successfully", async () => {
    await deleteUser(bearerToken, deletedUser.password);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "your account has been deleted");
  });

  it("Invalid password", async () => {
    deletedUser.password = "vtjln321";

    await deleteUser(bearerToken, deletedUser.password);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Password must be at least 8 characters", async () => {
    deletedUser.password = "vtjln12";

    await deleteUser(bearerToken, deletedUser.password);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await deleteUser(errorToken, deletedUser.password);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await deleteUser(errorToken, deletedUser.password);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("delete", server, "user");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, deletedUser.password);
    await deleteUser(bearerToken, deletedUser.password);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    deletedUser.password = null;

    await deleteUser(bearerToken, deletedUser.password);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
