import GeneralUserSchema from "./GeneralUserSchema";

const UserSchema = GeneralUserSchema.omit([ "new_email", "new_password" ]);

export default UserSchema;
