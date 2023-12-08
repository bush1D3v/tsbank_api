import * as yup from "yup";

const GeneralTransactionSchema = yup.object({
  type: yup.string().required(),
  description: yup.string().required(),
  value: yup.number().min(0.01).required(),
  password: yup.string().min(8).required(),
  email: yup.string().email().required(),
  cpf: yup.string().min(11).max(11).required()
});

export default GeneralTransactionSchema;
