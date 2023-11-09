import request from "supertest";
import server from "../../src/server";

describe("User Insertion Controller Tests", () => {
  it("Create a new user successfully", async () => {
    const newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };

    const response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).toHaveProperty("email", newUser.email);
  });

  it("Password must be at least 8 characters", async () => {
    const newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln12"
    };

    const response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password must be at least 8 characters");
  });

  it("Cpf must be at least 11 characters", async () => {
    const newUser = {
      name: "Victor Navarro",
      cpf: "1234567893",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };

    const response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "cpf must be at least 11 characters");
  });

  it("This cpf already used per other user", async () => {
    let newUser = {
      name: "Victor Navarro",
      cpf: "12345678934",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };

    let response = await request(server)
      .post("/user")
      .send(newUser);

    newUser = {
      name: "Victor Navarro",
      cpf: "12345678934",
      phone: "21123456788",
      email: "victorjln2@gmail.com",
      password: "vtjln123"
    };

    response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this cpf already used per other user");
  });

  it("Phone must be at least 10 characters", async () => {
    const newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "211234567",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };

    const response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "phone must be at least 10 characters");
  });

  it("This phone already used per other user", async () => {
    let newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };

    let response = await request(server)
      .post("/user")
      .send(newUser);

    newUser = {
      name: "Victor Navarro",
      cpf: "12345678941",
      phone: "21123456789",
      email: "victorjln2@gmail.com",
      password: "vtjln123"
    };

    response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this phone already used per other user");
  });

  it("Email must be a valid email", async () => {
    const newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "2112345676",
      email: "victorjln@",
      password: "vtjln123"
    };

    const response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email must be a valid email");
  });

  it("This email already used per other user", async () => {
    let newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "21123456789",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };

    let response = await request(server)
      .post("/user")
      .send(newUser);

    newUser = {
      name: "Victor Navarro",
      cpf: "12345678930",
      phone: "21123456788",
      email: "victorjln@gmail.com",
      password: "vtjln123"
    };

    response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "this email already used per other user");
  });

  it("Some request field missing", async () => {
    const newUser = {
      name: "Victor Navarro",
      cpf: "12345678931",
      phone: "21123456789",
      email: "victorjln@gmail.com"
    };

    const response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    server.close();
  });
});
