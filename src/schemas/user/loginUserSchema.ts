import userSchema from "./userSchema";

const loginUserSchema = userSchema.omit([ "name" ]);

export default loginUserSchema;
