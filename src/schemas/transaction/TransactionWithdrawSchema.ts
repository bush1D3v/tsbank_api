import GeneralTransactionSchema from "./GeneralTransactionSchema";

const TransactionWithdrawSchema = GeneralTransactionSchema.omit([ "description", "type", "email", "cpf" ]);

export default TransactionWithdrawSchema;
