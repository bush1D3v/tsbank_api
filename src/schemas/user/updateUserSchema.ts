import generalUserSchema from "./generalUserSchema";

const updateUserSchema = generalUserSchema.omit([ "name", "email" ]);

export default updateUserSchema;
