import express from "express";
import { helloWorld, insertUser, loginUser } from "../controllers";
import { verifyUserBody, verifyLoginUserBody } from "../middlewares";

const routes = express();

routes.get("/", helloWorld);
routes.post("/user", verifyUserBody, insertUser);
routes.post("/login", verifyLoginUserBody, loginUser);

export default routes;
