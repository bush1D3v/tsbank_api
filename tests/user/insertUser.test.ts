import request from "supertest";
import server from "../../src/server";

describe("User Insertion Controller Tests", () => {
  it("Must create a new user successfully", async () => {
    const newUser = {
      name: "New User",
      email: "new@user.com",
      password: "password123",
    };

    const response = await request(server)
      .post("/user")
      .send(newUser);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).toHaveProperty("email", newUser.email);
  });

  it("Must handle type errors correctly", async () => {
    const newUser = {
      name: "User with error",
      email: "error@user.com",
      password: 123456,
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
