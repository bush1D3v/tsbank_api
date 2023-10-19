import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(routes);
app.listen(process.env.PORT);
