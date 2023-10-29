import express from "express";

import {
  insertUser,
  loginUser,
  detailUser,
  updateUser,
  updateUserEmail,
  updateUserPassword,
  deleteUser
} from "../controllers";

import {
  verifyUserBody,
  verifyLoginUserBody,
  auth,
  verifyUpdateEmailUserBody,
  verifyUpdateUserBody,
  verifyUpdatePasswordUserBody,
  verifyPassword
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
  verifyUpdateUserBody,
  updateUser
);

UserRoutes.patch(
  "/email",
  verifyUpdateEmailUserBody,
  updateUserEmail
);

UserRoutes.patch(
  "/password",
  verifyUpdatePasswordUserBody,
  updateUserPassword
);

UserRoutes.delete(
  "/user",
  verifyPassword,
  deleteUser
);

export default UserRoutes;
