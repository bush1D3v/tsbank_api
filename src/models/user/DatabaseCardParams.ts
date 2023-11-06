export interface DatabaseCardParams {
  id: number;
  card_number: number;
  cardholder_name: string;
  expiration_date: Date;
  cvv: number;
  user_id: number;
  created_at: Date;
  balance: number;
  password: string;
};
