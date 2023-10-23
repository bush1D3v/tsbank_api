import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { userRoutes, transactionRoutes } from "./routes";
import { helloWorld } from "./controllers";

const app = express();

app.use(express.json());
app.get("/", helloWorld);
app.use(userRoutes);
app.use(transactionRoutes);

export default app;
