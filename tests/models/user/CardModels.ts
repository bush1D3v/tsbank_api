import { CardParams } from "../../../src/models";

const credit: CardParams = {
  "card_number": "1234567812345678",
  "cardholder_name": "Victor Navarro",
  "expiration_date": "12/31",
  "cvv": "123",
  "password": "123456",
  "card_type": "credit"
};

const debit: CardParams = {
  "card_number": "8765432187654321",
  "cardholder_name": "Victor Navarro",
  "expiration_date": "12/31",
  "cvv": "123",
  "password": "123456",
  "card_type": "debit"
};

export { credit, debit };
