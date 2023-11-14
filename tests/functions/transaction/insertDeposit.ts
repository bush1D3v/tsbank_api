import request from "supertest";
import server from "../../../src/server";
import { DepositParams } from "../../../src/models";

let response: request.Response;

export default async function insertDeposit(token: string | undefined, deposit: DepositParams) {
  response = await request(server)
    .post("/deposit")
    .set("Authorization", `Bearer ${token}`)
    .send(deposit);

  return response;
};
