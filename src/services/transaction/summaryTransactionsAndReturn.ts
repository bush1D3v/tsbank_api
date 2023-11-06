import { Request } from "express";
import { getToken } from "../../utils";
import { getTransactions, getTypeValue } from "../../repositories";
import { getTypedTransactions } from "../../repositories";

export default async function summaryTransactionsAndReturn(req: Request) {
  const id = getToken(req);

  const transactions = await getTransactions(id);

  const typedTransactions = getTypedTransactions(transactions);

  const outputValue = getTypeValue(typedTransactions.output);

  const inputValue = getTypeValue(typedTransactions.input);

  return {
    input: inputValue,
    output: outputValue
  };
};
