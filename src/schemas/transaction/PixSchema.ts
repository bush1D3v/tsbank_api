import GeneralTransactionSchema from "./GeneralTransactionSchema";

const PixSchema = GeneralTransactionSchema.omit([ "email", "description", "email", "type" ]);

export default PixSchema;
