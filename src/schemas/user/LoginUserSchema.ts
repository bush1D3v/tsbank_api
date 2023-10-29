import userSchema from "./UserSchema";

const LoginUserSchema = userSchema.omit([ "name" ]);

export default LoginUserSchema;
