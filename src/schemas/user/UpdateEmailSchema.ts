import GeneralUserSchema from "./GeneralUserSchema";

const UpdateEmailSchema = GeneralUserSchema.omit([ "new_password", "email", "name", "cpf", "phone", "new_phone" ]);

export default UpdateEmailSchema;
