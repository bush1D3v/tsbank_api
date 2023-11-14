import request from "supertest";
import { Server } from "http";

let response: request.Response;

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export default async function unauthUser(method: HttpMethod, server: Server, url: string) {
  response = await request(server)
  [ method ]("/" + url)
    .send();

  return response;
};
