import express from "express";

import {
  insertTransaction,
  listTransactions,
  detailTransaction,
  updateTransaction,
  deleteTransaction
} from "../controllers";

import {
  verifyTransactionBody,
  verifyType,
  verifyTypeofParams
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

transactionRoutes.put(
  "/transaction/:id",
  verifyTypeofParams,
  verifyTransactionBody,
  updateTransaction
);

transactionRoutes.delete(
  "/transaction/:id",
  verifyTypeofParams,
  deleteTransaction
);

export default transactionRoutes;
