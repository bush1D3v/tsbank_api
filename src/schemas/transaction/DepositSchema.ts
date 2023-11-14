import GeneralTransactionSchema from "./GeneralTransactionSchema";

const DepositSchema = GeneralTransactionSchema.omit([ "type", "description", "cpf" ]);

export default DepositSchema;
