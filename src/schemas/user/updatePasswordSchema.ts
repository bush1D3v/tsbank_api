import generalUserSchema from "./generalUserSchema";

const updatePasswordSchema = generalUserSchema.omit([ "new_email", "name", "email" ]);

export default updatePasswordSchema;
