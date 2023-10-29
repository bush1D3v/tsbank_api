import generalUserSchema from "./GeneralUserSchema";

const UpdateUserSchema = generalUserSchema.omit([ "name", "email" ]);

export default UpdateUserSchema;
