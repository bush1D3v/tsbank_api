import GeneralUserSchema from "./GeneralUserSchema";

const UpdateEmailSchema = GeneralUserSchema.omit([ "new_password", "email", "name" ]);

export default UpdateEmailSchema;
