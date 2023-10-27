import express from "express";

import {
  insertTransaction,
  listTransactions,
  detailTransaction,
  updateTransaction
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

transactionRoutes.put(
  "/transaction/:id",
  verifyTransactionBody,
  updateTransaction
);

export default transactionRoutes;
