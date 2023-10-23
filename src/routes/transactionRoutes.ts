import express from "express";

import { insertTransaction } from "../controllers";

import {
  verifyTransactionBody,
  verifyCategorieId,
  verifyType
} from "../middlewares";

const transactionRoutes = express();

transactionRoutes.post(
  "/transaction",
  verifyType,
  verifyTransactionBody,
  verifyCategorieId,
  insertTransaction
);

export default transactionRoutes;
