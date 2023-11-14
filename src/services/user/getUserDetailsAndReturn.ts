import { getToken } from "../../utils";
import { Request } from "express";
import { getUserPerId } from "../../repositories";
import { undefinedUser } from "../../providers";

export default async function getUserDetailsAndReturn(req: Request) {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  undefinedUser(user);

  const { password: _, ...userResponse } = user;

  return userResponse;
};
