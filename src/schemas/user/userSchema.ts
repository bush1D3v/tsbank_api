import loginUserSchema from "./loginUserSchema";

const userSchema = loginUserSchema.shape({
  name: loginUserSchema.fields.password,
  email: loginUserSchema.fields.email,
  password: loginUserSchema.fields.password
});

export default userSchema;
