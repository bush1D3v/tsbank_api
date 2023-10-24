import express from "express";

import {
  insertTransaction,
  listTransactions,
  detailTransaction
} from "../controllers";

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

transactionRoutes.get(
  "/transaction/:id",
  detailTransaction
);

export default transactionRoutes;
