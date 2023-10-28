import { HttpStatusError } from "../../error";
import { getTransaction } from "../../repositories";

export default async function verifyTransactionId(id: Number) {
  const transaction = await getTransaction(id);

  if (!transaction) {
    throw new HttpStatusError("Transaction not found", 404);
  }
};
