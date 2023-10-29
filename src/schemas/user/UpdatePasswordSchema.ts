import generalUserSchema from "./GeneralUserSchema";

const UpdatePasswordSchema = generalUserSchema.omit([ "new_email", "name", "email" ]);

export default UpdatePasswordSchema;
