import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";
import {
  userRoutes,
  transactionRoutes,
  swaggerRoutes,
  renderAutoReq
} from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(swaggerRoutes);
app.use(userRoutes);
app.use(transactionRoutes);
app.use(renderAutoReq);

export default app;
