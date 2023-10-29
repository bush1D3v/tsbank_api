import generalUserSchema from "./generalUserSchema";

const passwordSchema = generalUserSchema.omit([ "email", "name", "new_password", "new_email" ]);

export default passwordSchema;
