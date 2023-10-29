import GeneralUserSchema from "./GeneralUserSchema";

const UpdateUserSchema = GeneralUserSchema.omit([ "name", "email" ]);

export default UpdateUserSchema;
