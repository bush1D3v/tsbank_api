import express from "express";

import {
  insertTransaction,
  listTransactions,
  detailTransaction,
  deleteTransaction
} from "../controllers";

import {
  verifyTransactionBody,
  verifyType,
  verifyTypeofParams,
  verifyPassword
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
  verifyTypeofParams,
  detailTransaction
);

transactionRoutes.delete(
  "/transaction/:id",
  verifyPassword,
  verifyTypeofParams,
  deleteTransaction
);

export default transactionRoutes;
