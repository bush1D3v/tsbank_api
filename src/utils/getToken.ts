import { Request } from "express";
import { verify } from "jsonwebtoken";
import jwtPassword from "../jwt/jwtPassword";
import { HttpStatusError } from "../error";

export default function getToken(req: Request): number {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpStatusError("unauthorized", 401);
  }

  const token = authorization.split(" ")[ 1 ];

  const userToken = verify(token, jwtPassword);

  if (typeof userToken !== "string") {
    return userToken.id;
  } else {
    throw new HttpStatusError("unauthorized", 401);
  }
};
