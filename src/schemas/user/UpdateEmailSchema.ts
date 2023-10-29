import generalUserSchema from "./GeneralUserSchema";

const UpdateEmailSchema = generalUserSchema.omit([ "new_password", "email", "name" ]);

export default UpdateEmailSchema;
