import express from "express";
import { insertUser } from "../controllers";
import { verifyUserBody } from "../middlewares";

const routes = express();

routes.post("/usuario", verifyUserBody, insertUser);

export default routes;
