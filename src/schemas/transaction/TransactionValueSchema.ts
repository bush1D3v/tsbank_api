import TransactionSchema from "./TransactionSchema";

const TransactionValueSchema = TransactionSchema.omit([ "category_id", "description", "type" ]);

export default TransactionValueSchema;
