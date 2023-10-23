import express from "express";

import { insertTransaction, listTransactions } from "../controllers";

import {
  verifyTransactionBody,
  verifyType
} from "../middlewares";

const transactionRoutes = express();

transactionRoutes.post(
  "/transaction",
  verifyType,
  verifyTransactionBody,
  insertTransaction
);

transactionRoutes.get(
  "/transaction",
  listTransactions
);

export default transactionRoutes;
