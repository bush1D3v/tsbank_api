export interface InsertCardParams {
  card_number: number;
  cardholder_name: string;
  expiration_date: Date;
  cvv: number;
  user_id: number;
  balance: number;
  password: string;
  card_type: string;
}
