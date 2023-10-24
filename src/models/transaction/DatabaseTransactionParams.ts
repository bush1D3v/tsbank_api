import { TransactionParams } from "./TransactionParams";

export interface DatabaseTransactionParams extends TransactionParams {
  id: number;
  user_id: number;
};
