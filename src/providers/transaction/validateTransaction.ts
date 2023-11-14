import { HttpStatusError } from "../../error";
import { getTransaction } from "../../repositories";

export default async function validateTransaction(transaction_id: number, user_id: number) {
  const transaction = await getTransaction(transaction_id);

  if (transaction.user_id != user_id) {
    throw new HttpStatusError("transaction not found", 404);
  }
};
