import UserSchema from "./UserSchema";

const LoginUserSchema = UserSchema.omit([ "name", "cpf", "phone" ]);

export default LoginUserSchema;
