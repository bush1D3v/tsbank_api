import request from "supertest";
import server from "../../src/server";
import { loginUser, user } from "../models";
import { deleteUser, insertUserAndLogin, unauthUser } from "../functions";

type UpdatePhoneUserTestParams = {
  new_phone: string | null;
  password: string | null;
};

let updatedPhoneUser: UpdatePhoneUserTestParams;
let bearerToken: string | undefined;
let response: request.Response;

const updatePhoneUser = async (token: string | undefined, user: UpdatePhoneUserTestParams) => {
  response = await request(server)
    .patch("/phone")
    .set("Authorization", `Bearer ${token}`)
    .send(user);

  return response;
};

describe("Update User Phone Controller Tests", () => {
  beforeEach(async () => {
    updatedPhoneUser = {
      "new_phone": "21987654321",
      "password": "vtjln123"
    };

    bearerToken = await insertUserAndLogin(user, loginUser);
  });

  it("Update a phone successfully", async () => {
    await updatePhoneUser(bearerToken, updatedPhoneUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", `your phone has been changed successfully, now is '${updatedPhoneUser.new_phone}'`);
  });

  it("Phone must be a valid phone", async () => {
    updatedPhoneUser.new_phone = "211234567";

    await updatePhoneUser(bearerToken, updatedPhoneUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "new_phone must be at least 10 characters");
  });

  it("This phone already used per other user", async () => {
    await updatePhoneUser(bearerToken, updatedPhoneUser);

    await updatePhoneUser(bearerToken, updatedPhoneUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this phone already used per other user");
  });

  it("Password must be at least 8 characters", async () => {
    updatedPhoneUser.password = "vtjln12";

    await updatePhoneUser(bearerToken, updatedPhoneUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Invalid password", async () => {
    updatedPhoneUser.password = "vtjln321";

    await updatePhoneUser(bearerToken, updatedPhoneUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Jwt mal formed", async () => {
    let errorToken;

    await updatePhoneUser(errorToken, updatedPhoneUser);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    const errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    await updatePhoneUser(errorToken, updatedPhoneUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    response = await unauthUser("patch", server, "phone");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, updatedPhoneUser.password);
    await updatePhoneUser(bearerToken, updatedPhoneUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    updatedPhoneUser.password = null;

    await updatePhoneUser(bearerToken, updatedPhoneUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
