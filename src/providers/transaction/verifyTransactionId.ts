import { HttpStatusError } from "../../error";
import { getTransaction } from "../../repositories";

const verifyTransactionId = async (id: Number) => {
  const transaction = await getTransaction(id);

  if (!transaction) {
    throw new HttpStatusError("Transaction not found", 404);
  }
};

export default verifyTransactionId;
