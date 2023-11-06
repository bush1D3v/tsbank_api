import GeneralCardSchema from "./GeneralCardSchema";

const CardSchema = GeneralCardSchema.omit([ "value", "new_password" ]);

export default CardSchema;
