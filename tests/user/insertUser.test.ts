import request from "supertest";
import server from "../../src/server";
import db from "../../src/data/connection";

type InsertUserTestParams = {
  name: string | null;
  email: string | null;
  password: string | null;
  cpf: string | null;
  phone: string | null;
};

let user: InsertUserTestParams;
let response: request.Response;

const createUser = async (user: InsertUserTestParams) => {
  response = await request(server)
    .post("/user")
    .send(user);

  return response;
};

describe("Insert User Controller Tests", () => {
  beforeEach(async () => {
    await db("users").delete("*");

    user = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };
  });

  it("Create a new user successfully", async () => {
    await createUser(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", user.name);
    expect(response.body).toHaveProperty("email", user.email);
  });

  it("Password must be at least 8 characters", async () => {
    user.password = "vtjln12";

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Cpf must be at least 11 characters", async () => {
    user.cpf = "1234567891";

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "cpf must be at least 11 characters");
  });

  it("This cpf already used per other user", async () => {
    await createUser(user);

    user.phone = "21123456788";
    user.email = "victorjln2@gmail.com";

    await createUser(user);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this cpf already used per other user");
  });

  it("Phone must be at least 10 characters", async () => {
    user.phone = "123456789";

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "phone must be at least 10 characters");
  });

  it("This phone already used per other user", async () => {
    await createUser(user);

    user.email = "victorjln2@gmail.com";
    user.cpf = "12345678930";

    await createUser(user);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this phone already used per other user");
  });

  it("Email must be a valid email", async () => {
    user.email = "victorjln@";

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email must be a valid email");
  });

  it("This email already used per other user", async () => {
    await createUser(user);

    user.phone = "21123456789";
    user.cpf = "12345678932";

    await createUser(user);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this email already used per other user");
  });

  it("Some request field missing", async () => {
    user.password = null;

    await createUser(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
