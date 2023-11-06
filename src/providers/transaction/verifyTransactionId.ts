import { HttpStatusError } from "../../error";
import { getTransaction } from "../../repositories";

export default async function verifyTransactiontransaction_id(transaction_id: Number) {
  const transaction = await getTransaction(transaction_id);

  if (!transaction) {
    throw new HttpStatusError("Transaction not found", 404);
  }
};
