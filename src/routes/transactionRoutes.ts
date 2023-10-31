import express from "express";

import {
  insertTransaction,
  listTransactions,
  detailTransaction,
  deleteTransaction,
  insertDeposit
} from "../controllers";

import {
  verifyTransactionBody,
  verifyType,
  verifyTypeofParams,
  verifyPassword,
  verifyTransactionValue
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

transactionRoutes.post(
  "/deposit",
  verifyTransactionValue,
  insertDeposit
);

export default transactionRoutes;
