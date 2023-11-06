import { DatabaseTransactionParams } from "../../models";

export default function getTypeValue(typedTransactions: DatabaseTransactionParams[]) {
  let finalValue = 0;
  for (let transaction of typedTransactions) {
    finalValue += transaction.value;
  }

  return finalValue;
};
