import { HttpStatusError } from "../../error";
import { DatabaseTransactionParams } from "../../models";

export default function verifyAccountTransactions(transaction: DatabaseTransactionParams[]) {
  if (transaction.length < 1) {
    throw new HttpStatusError("your account does not have any registered transaction", 404);
  }
};
