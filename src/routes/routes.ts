import express from "express";

import {
  helloWorld,
  insertUser,
  loginUser,
  detailUser,
  updateUser
} from "../controllers";

import { verifyUserBody, verifyLoginUserBody, auth, verifyEmailExists } from "../middlewares";

const routes = express();

routes.get("/", helloWorld);
routes.post("/user", verifyUserBody, verifyEmailExists, insertUser);
routes.post("/login", verifyLoginUserBody, loginUser);

routes.use(auth);

routes.get("/user", detailUser);
routes.put("/user", verifyUserBody, verifyEmailExists, updateUser);

export default routes;
