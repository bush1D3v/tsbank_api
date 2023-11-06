import * as yup from "yup";

const GeneralCardSchema = yup.object({
  card_number: yup.string().min(16).max(16).required(),
  cardholder_name: yup.string().required(),
  expiration_date: yup.date().required(),
  cvv: yup.string().min(3).max(3).required(),
  password: yup.string().min(4).max(6).required(),
  new_password: yup.string().min(4).max(6).required(),
  card_type: yup.string().required(),
  value: yup.number().min(0.1).required()
});

export default GeneralCardSchema;
