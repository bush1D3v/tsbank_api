import { Request } from "express";
import { verify } from "jsonwebtoken";
import jwtPassword from "../jwt/jwtPassword";

const getToken = (req: Request): number => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Unauthorized");
  }

  const token = authorization.split(" ")[ 1 ];

  const userToken = verify(token, jwtPassword);

  if (typeof userToken !== "string") {
    return userToken.id;
  } else {
    throw new Error("Unauthorized");
  }
};

export default getToken;
