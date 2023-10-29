import generalUserSchema from "./GeneralUserSchema";

const PasswordSchema = generalUserSchema.omit([ "email", "name", "new_password", "new_email" ]);

export default PasswordSchema;
