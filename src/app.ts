import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { userRoutes, transactionRoutes, swaggerRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(swaggerRoutes);
app.use(userRoutes);
app.use(transactionRoutes);

export default app;
