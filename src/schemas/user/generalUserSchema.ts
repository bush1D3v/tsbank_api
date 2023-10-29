import * as yup from "yup";

const generalUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  new_password: yup.string().min(8).required(),
  new_email: yup.string().email().required()
});

export default generalUserSchema;
