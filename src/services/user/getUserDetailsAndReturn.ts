import getToken from "../../utils/getToken";
import { Request } from "express";
import { getUserPerId } from "../../repositories";

const getUserDetailsAndReturn = async (req: Request) => {
  const userId = getToken(req);

  const user = await getUserPerId(userId);

  return user;
};

export default getUserDetailsAndReturn;
