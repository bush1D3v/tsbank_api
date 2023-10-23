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
  auth,
  verifyEmailExists
} from "../middlewares";

const UserRoutes = express();

UserRoutes.post(
  "/user",
  verifyUserBody,
  verifyEmailExists,
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
  verifyEmailExists,
  updateUser
);

export default UserRoutes;
