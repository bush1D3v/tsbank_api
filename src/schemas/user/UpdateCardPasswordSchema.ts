import GeneralCardSchema from "./GeneralCardSchema";

const UpdateCardPasswordSchema = GeneralCardSchema.omit([ "value", "cvv", "expiration_date", "card_number", "cardholder_name" ]);

export default UpdateCardPasswordSchema;
