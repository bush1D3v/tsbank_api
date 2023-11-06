import GeneralTransactionSchema from "./GeneralTransactionSchema";

const DepositSchema = GeneralTransactionSchema.omit([ "type", "description", "password", "cpf" ]);

export default DepositSchema;
