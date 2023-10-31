import UserSchema from "./UserSchema";

const LoginUserSchema = UserSchema.omit([ "name" ]);

export default LoginUserSchema;
