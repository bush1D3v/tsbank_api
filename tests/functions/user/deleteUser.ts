import request from "supertest";
import server from "../../../src/server";

export default async function deleteUser(token: string | undefined, password: string | null) {
  await request(server)
    .delete("/user")
    .set("Authorization", `Bearer ${token}`)
    .send({ password });
};
