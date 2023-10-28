import { getToken } from "../../utils";
import { Request } from "express";
import { getUserPerId } from "../../repositories";

export default async function getUserDetailsAndReturn(req: Request) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  return user;
};
