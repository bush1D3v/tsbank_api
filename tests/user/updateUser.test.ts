import request from "supertest";
import server from "../../src/server";
import { LoginUserParams, UserParams } from "../../src/models";

type UpdateUserTestParams = {
  new_phone: string | null;
  new_email: string | null;
  new_password: string | null;
  password: string | null;
};

const user: UserParams = {
  name: "Victor Navarro",
  cpf: "12345678931",
  phone: "21123456789",
  email: "victorjln@gmail.com",
  password: "vtjln123"
};

const loginUser: LoginUserParams = {
  email: "victorjln@gmail.com",
  password: "vtjln123"
};

const unauthUser = async () => {
  response = await request(server)
    .put("/user")
    .send(updatedUser);

  return response;
};

const deleteUser = async (token: string | undefined, password: string | null) => {
  response = await request(server)
    .delete("/user")
    .set("Authorization", `Bearer ${token}`)
    .send({ password });

  return response;
};

const updateUser = async (token: string | undefined, user: UpdateUserTestParams) => {
  response = await request(server)
    .put("/user")
    .set("Authorization", `Bearer ${token}`)
    .send(user);

  return response;
};

let updatedUser: UpdateUserTestParams;
let bearerToken: string | undefined;
let response: request.Response;

describe("Update User Controller Tests", () => {
  beforeEach(async () => {
    updatedUser = {
      new_phone: "22123456789",
      new_email: "victorjln2@gmail.com",
      new_password: "vtjln321",
      password: "vtjln123"
    };

    await deleteUser(bearerToken, updatedUser.new_password);

    await request(server)
      .post("/user")
      .send(user);

    const tokenReq = await request(server)
      .post("/login")
      .send(loginUser);

    bearerToken = tokenReq.body.token;
  });

  it("Update a user successfully", async () => {
    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email", updatedUser.new_email);
  });

  it("Password must be at least 8 characters", async () => {
    updatedUser.password = "vtjln12";

    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Invalid password", async () => {
    updatedUser.password = "vtjln321";

    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid password");
  });

  it("Phone must be at least 10 characters", async () => {
    updatedUser.new_phone = "123456789";

    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "new_phone must be at least 10 characters");
  });

  it("This phone already used per other user", async () => {
    await updateUser(bearerToken, updatedUser);

    updatedUser.new_email = "victorjln3@gmail.com";

    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this phone already used per other user");
  });

  it("Email must be a valid email", async () => {
    updatedUser.new_email = "victorjln@";

    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "new_email must be a valid email");
  });

  it("This email already used per other user", async () => {
    await updateUser(bearerToken, updatedUser);

    updatedUser.new_phone = "21123456789";

    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this email already used per other user");
  });

  it("Jwt mal formed", async () => {
    let errorToken;
    await updateUser(errorToken, updatedUser);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "jwt malformed");
  });

  it("Invalid signature", async () => {
    let errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    await updateUser(errorToken, updatedUser);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    await unauthUser();

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken, updatedUser.password);
    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("message", "user not found");
  });

  it("Some request field missing", async () => {
    updatedUser.password = null;

    await updateUser(bearerToken, updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
