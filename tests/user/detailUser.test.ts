import request from "supertest";
import server from "../../src/server";
import { UserParams } from "../../src/models";

const user: UserParams = {
  name: "Victor Navarro",
  cpf: "12345678931",
  phone: "21123456789",
  email: "victorjln@gmail.com",
  password: "vtjln123"
};

const loginUser = {
  email: "victorjln@gmail.com",
  password: "vtjln123"
};

let bearerToken: string | undefined;
let response: request.Response;

const deleteUser = async (token: string | undefined) => {
  const password = user.password;
  response = await request(server)
    .delete("/user")
    .set("Authorization", `Bearer ${token}`)
    .send({ "password": password });

  return response;
};

const detailUser = async (token: string | undefined) => {
  response = await request(server)
    .get("/user")
    .set("Authorization", `Bearer ${token}`)
    .send();

  return response;
};

const unauthUser = async () => {
  response = await request(server)
    .get("/user")
    .send();

  return response;
};

describe("Detail User Controller Tests", () => {
  beforeAll(async () => {
    await request(server)
      .post("/user")
      .send(user);

    const tokenReq = await request(server)
      .post("/login")
      .send(loginUser);

    bearerToken = tokenReq.body.token;
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
    let errorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    await detailUser(errorToken);

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "invalid signature");
  });

  it("Unauthorized", async () => {
    await unauthUser();

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty("message", "unauthorized");
  });

  it("User not found", async () => {
    await deleteUser(bearerToken);
    await detailUser(bearerToken);

    expect(response.status).toBe(404);

    expect(response.body).toHaveProperty("message", "user not found");
  });
});
