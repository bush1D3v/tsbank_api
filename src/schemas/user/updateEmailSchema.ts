import generalUserSchema from "./generalUserSchema";

const updateEmailSchema = generalUserSchema.omit([ "new_password", "email", "name" ]);

export default updateEmailSchema;
