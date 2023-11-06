import GeneralUserSchema from "./GeneralUserSchema";

const UpdatePhoneSchema = GeneralUserSchema.omit([ "name", "email", "cpf", "phone", "new_email", "new_password" ]);

export default UpdatePhoneSchema;
