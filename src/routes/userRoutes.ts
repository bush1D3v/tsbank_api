import express from "express";

import {
  insertUser,
  loginUser,
  detailUser,
  updateUser,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
  insertCard,
  updateCardPassword,
  updateUserPhone,
  detailCards
} from "../controllers";

import {
  verifyUserBody,
  verifyLoginUserBody,
  auth,
  verifyUpdateEmailUserBody,
  verifyUpdateUserBody,
  verifyUpdatePasswordUserBody,
  verifyPassword,
  verifyCardBody,
  verifyUpdateCardPassword,
  verifyUpdatePhoneUserBody
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

UserRoutes.patch(
  "/phone",
  verifyUpdatePhoneUserBody,
  updateUserPhone
);

UserRoutes.delete(
  "/user",
  verifyPassword,
  deleteUser
);

UserRoutes.post(
  "/card",
  verifyCardBody,
  insertCard
);

UserRoutes.get(
  "/card",
  detailCards
);

UserRoutes.patch(
  "/card",
  verifyUpdateCardPassword,
  updateCardPassword
);

export default UserRoutes;
