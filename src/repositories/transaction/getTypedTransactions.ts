import { DatabaseTransactionParams } from "../../models";

export default function getTypedTransactions(transactions: DatabaseTransactionParams[]) {
  const inputTransactions = [];
  const outputTransactions = [];

  for (let transaction of transactions) {
    if (transaction.type.toLowerCase() === "input") {
      inputTransactions.push(transaction);
    }
    if (transaction.type.toLowerCase() === "output") {
      outputTransactions.push(transaction);
    }
  }

  return {
    "input": inputTransactions,
    "output": outputTransactions
  };
};
