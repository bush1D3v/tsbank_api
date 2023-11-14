import request from "supertest";
import server from "../../../src/server";
import { WithdrawParams } from "../../../src/models";

let response: request.Response;

export default async function makeWithdraw(token: string | undefined, withdraw: WithdrawParams) {
  response = await request(server)
    .post("/withdraw")
    .set("Authorization", `Bearer ${token}`)
    .send(withdraw);

  return response;
};
