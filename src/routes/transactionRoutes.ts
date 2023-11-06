import express from "express";

import {
  insertTransaction,
  summaryTransactions,
  detailTransaction,
  deleteTransaction,
  insertDeposit,
  makeWithdraw,
  insertCardTransaction,
  insertPix,
  makeCardPay,
  getHistory
} from "../controllers";

import {
  verifyTransactionBody,
  verifyType,
  verifyTypeofParams,
  verifyPassword,
  verifyOutputTransaction,
  verifyDepositTransaction,
  verifyCardTransaction,
  verifyPixValue,
  verifyCardPay,
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
  summaryTransactions
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
  verifyDepositTransaction,
  insertDeposit
);

transactionRoutes.post(
  "/withdraw",
  verifyOutputTransaction,
  makeWithdraw
);

transactionRoutes.post(
  "/transaction/card",
  verifyCardTransaction,
  insertCardTransaction
);

transactionRoutes.post(
  "/pix",
  verifyPixValue,
  insertPix
);

transactionRoutes.post(
  "/card/pay",
  verifyCardPay,
  makeCardPay
);

transactionRoutes.get(
  "/history",
  getHistory
);

export default transactionRoutes;
