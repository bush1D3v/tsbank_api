import request from "supertest";
import server from "../../../src/server";
import { CardParams } from "../../../src/models";

export default async function insertCard(token: string | undefined, card: CardParams) {
  await request(server)
    .post("/card")
    .set("Authorization", `Bearer ${token}`)
    .send(card);
};
