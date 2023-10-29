import generalUserSchema from "./generalUserSchema";

const deleteUserSchema = generalUserSchema.omit([ "email", "name", "new_password", "new_email" ]);

export default deleteUserSchema;
