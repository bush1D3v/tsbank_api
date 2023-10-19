import * as yup from "yup";

const userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
});

export default userSchema;
