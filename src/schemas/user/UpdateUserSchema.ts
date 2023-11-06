import GeneralUserSchema from "./GeneralUserSchema";

const UpdateUserSchema = GeneralUserSchema.omit([ "name", "email", "cpf", "phone" ]);

export default UpdateUserSchema;
