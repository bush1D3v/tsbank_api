import GeneralTransactionSchema from "./GeneralTransactionSchema";

const CardPaySchema = GeneralTransactionSchema.omit([ "description", "type", "email", "cpf" ]);

export default CardPaySchema;
