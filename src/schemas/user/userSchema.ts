import generalUserSchema from "./generalUserSchema";

const userSchema = generalUserSchema.omit([ "new_email", "new_password" ]);

export default userSchema;
