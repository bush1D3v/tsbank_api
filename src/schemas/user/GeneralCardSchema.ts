import * as yup from "yup";

const GeneralCardSchema = yup.object({
  card_number: yup.string().min(16).max(16).required(),
  cardholder_name: yup.string().min(10).required(),
  expiration_date: yup.date().min(5).max(5).required(),
  cvv: yup.string().min(3).max(3).required(),
  password: yup.string().min(4).max(6).required(),
  new_password: yup.string().min(4).max(6).required(),
  card_type: yup.string().min(5).max(6).required(),
  value: yup.number().min(0.01).required()
});

export default GeneralCardSchema;
