import express from "express";
import { helloWorld, insertUser } from "../controllers";
import { verifyUserBody } from "../middlewares";


const routes = express();

routes.get("/", helloWorld);
routes.post("/usuario", verifyUserBody, insertUser);

export default routes;
