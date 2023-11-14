import { Request } from "express";
import { getToken } from "../../utils";
import { getTypedTransactions } from "../../repositories";
import { verifyAccountTransactions } from "../../providers";
import { getTransactions, getTypeValue } from "../../repositories";

export default async function summaryTransactionsAndReturn(req: Request) {
  const id = getToken(req);

  const transactions = await getTransactions(id);

  verifyAccountTransactions(transactions);

  const typedTransactions = getTypedTransactions(transactions);

  const outputValue = getTypeValue(typedTransactions.output);

  const inputValue = getTypeValue(typedTransactions.input);

  return {
    input: inputValue,
    output: outputValue
  };
};
