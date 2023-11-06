import GeneralUserSchema from "./GeneralUserSchema";

const UpdatePasswordSchema = GeneralUserSchema.omit([ "new_email", "name", "email", "cpf", "phone", "new_phone" ]);

export default UpdatePasswordSchema;
