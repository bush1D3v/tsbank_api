import LoginUserSchema from "./LoginUserSchema";

const PasswordSchema = LoginUserSchema.omit([ "email" ]);

export default PasswordSchema;
