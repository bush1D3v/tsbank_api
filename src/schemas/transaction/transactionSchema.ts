import * as yup from "yup";

const transactionSchema = yup.object({
  type: yup.string().required(),
  description: yup.string().required(),
  value: yup.number().required(),
  categorie_id: yup.number().required()
});

export default transactionSchema;
