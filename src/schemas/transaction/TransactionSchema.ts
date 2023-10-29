import * as yup from "yup";

const TransactionSchema = yup.object({
  type: yup.string().required(),
  description: yup.string().required(),
  value: yup.number().required(),
  category_id: yup.number().required()
});

export default TransactionSchema;
