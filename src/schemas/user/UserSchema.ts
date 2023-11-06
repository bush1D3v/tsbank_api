import GeneralUserSchema from "./GeneralUserSchema";

const UserSchema = GeneralUserSchema.omit([ "new_email", "new_password", "new_phone" ]);

export default UserSchema;
