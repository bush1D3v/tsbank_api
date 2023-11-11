import request from "supertest";
import server from "../../src/server";
import { UserParams } from "../../src/models";

type LoginUserTestParams = {
  email: string | null;
  password: string | number | null;
}

let logedUser: LoginUserTestParams;
let response: request.Response;

const createdUser: UserParams = {
  name: "Victor Navarro",
  cpf: "12345678931",
  phone: "21123456789",
  email: "victorjln@gmail.com",
  password: "vtjln123"
};

const loginUser = async (user: LoginUserTestParams) => {
  response = await request(server)
    .post("/login")
    .send(user);

  return response;
};

describe("Login User Controller Tests", () => {
  beforeEach(async () => {
    logedUser = {
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };
  });

  beforeAll(async () => {
    await request(server)
      .post("/user")
      .send(createdUser);
  });


  it("Login a user successfully", async () => {
    await loginUser(logedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("Data and hash must be strings", async () => {
    logedUser.password = 12345678;

    await loginUser(logedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "data and hash must be strings");
  });

  it("Password must be at least 8 characters", async () => {
    logedUser.password = "vtjln12";

    await loginUser(logedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Invalid email", async () => {
    logedUser.email = "victorjln2@gmail.com";

    await loginUser(logedUser);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid email");
  });

  it("Email must be a valid email", async () => {
    logedUser.email = "victorjln@";

    await loginUser(logedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email must be a valid email");
  });

  it("Some request field missing", async () => {
    logedUser.password = null;

    await loginUser(logedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
