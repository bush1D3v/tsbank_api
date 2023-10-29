import GeneralUserSchema from "./GeneralUserSchema";

const UpdatePasswordSchema = GeneralUserSchema.omit([ "new_email", "name", "email" ]);

export default UpdatePasswordSchema;
