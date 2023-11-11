import request from "supertest";
import server from "../../src/server";
import db from "../../src/data/connection";

type InsertUserTestParams = {
  name: string | null;
  email: string | null;
  password: string | null;
  cpf: string | null;
  phone: string | null;
}

let newUser: InsertUserTestParams;
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

    newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };
  });

  it("Create a new user successfully", async () => {
    await createUser(newUser);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).toHaveProperty("email", newUser.email);
  });

  it("Password must be at least 8 characters", async () => {
    newUser.password = "vtjln12";

    await createUser(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Cpf must be at least 11 characters", async () => {
    newUser.cpf = "1234567891";

    await createUser(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "cpf must be at least 11 characters");
  });

  it("This cpf already used per other user", async () => {
    await createUser(newUser);

    newUser.phone = "21123456788";
    newUser.email = "victorjln2@gmail.com";

    await createUser(newUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this cpf already used per other user");
  });

  it("Phone must be at least 10 characters", async () => {
    newUser.phone = "123456789";

    await createUser(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "phone must be at least 10 characters");
  });

  it("This phone already used per other user", async () => {
    await createUser(newUser);

    newUser.email = "victorjln2@gmail.com";
    newUser.cpf = "12345678930";

    await createUser(newUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this phone already used per other user");
  });

  it("Email must be a valid email", async () => {
    newUser.email = "victorjln@";

    await createUser(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email must be a valid email");
  });

  it("This email already used per other user", async () => {
    await createUser(newUser);

    newUser.phone = "21123456789";
    newUser.cpf = "12345678932";

    await createUser(newUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this email already used per other user");
  });

  it("Some request field missing", async () => {
    newUser.password = null;

    await createUser(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is a required field");
  });
});
