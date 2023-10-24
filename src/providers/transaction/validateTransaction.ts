import { HttpStatusError } from "../../error";
import { getTransaction } from "../../repositories";

const validateTransaction = async (transaction_id: Number, user_id: Number) => {
  const transaction = await getTransaction(transaction_id);

  if (transaction.user_id != user_id) {
    throw new HttpStatusError("Transaction not found", 404);
  }
};

export default validateTransaction;
