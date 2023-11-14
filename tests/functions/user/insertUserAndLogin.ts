import request from "supertest";
import server from "../../../src/server";
import { LoginUserParams, UserParams } from "../../../src/models";

let bearerToken: string | undefined;

export default async function insertUserAndLogin(user: UserParams, loginUser: LoginUserParams) {
  await request(server)
    .post("/user")
    .send(user);

  const tokenReq = await request(server)
    .post("/login")
    .send(loginUser);

  bearerToken = tokenReq.body.token;

  return bearerToken;
};
