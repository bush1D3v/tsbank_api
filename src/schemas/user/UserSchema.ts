import generalUserSchema from "./GeneralUserSchema";

const UserSchema = generalUserSchema.omit([ "new_email", "new_password" ]);

export default UserSchema;
