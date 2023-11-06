import GeneralTransactionSchema from "./GeneralTransactionSchema";

const TransactionSchema = GeneralTransactionSchema.omit([ "password", "email", "cpf" ]);

export default TransactionSchema;
