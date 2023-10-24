import express from "express";

import {
  insertUser,
  loginUser,
  detailUser,
  updateUser
} from "../controllers";

import {
  verifyUserBody,
  verifyLoginUserBody,
  auth
} from "../middlewares";

const UserRoutes = express();

UserRoutes.post(
  "/user",
  verifyUserBody,
  insertUser
);
UserRoutes.post(
  "/login",
  verifyLoginUserBody,
  loginUser
);

UserRoutes.use(auth);

UserRoutes.get(
  "/user",
  detailUser
);
UserRoutes.put(
  "/user",
  verifyUserBody,
  updateUser
);

export default UserRoutes;
