import express from "express";
import { helloWorld, insertUser, loginUser, detailUser } from "../controllers";
import { verifyUserBody, verifyLoginUserBody, auth } from "../middlewares";

const routes = express();

routes.get("/", helloWorld);
routes.post("/user", verifyUserBody, insertUser);
routes.post("/login", verifyLoginUserBody, loginUser);

routes.use(auth);

routes.get("/user", detailUser);

export default routes;
