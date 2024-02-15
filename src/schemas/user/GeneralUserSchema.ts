import * as yup from "yup";

const GeneralUserSchema = yup.object({
  name: yup.string().max(75).required(),
  email: yup.string().email().max(75).required(),
  cpf: yup.string().min(11).max(11).required(),
  phone: yup.string().min(10).max(11).required(),
  new_phone: yup.string().min(10).max(11).required(),
  password: yup.string().min(8).max(16).required(),
  new_password: yup.string().min(8).max(16).required(),
  new_email: yup.string().email().max(75).required()
});

export default GeneralUserSchema;
