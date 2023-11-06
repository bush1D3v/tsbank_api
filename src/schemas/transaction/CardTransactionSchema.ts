import { GeneralCardSchema } from "../user";

const CardTransactionSchema = GeneralCardSchema.omit([ "card_number", "cardholder_name", "cvv", "expiration_date", "new_password" ]);

export default CardTransactionSchema;
