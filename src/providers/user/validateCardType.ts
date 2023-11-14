export default function validateCardType(card_type: string) {
  if (card_type.toLowerCase() !== "credit" && card_type.toLowerCase() !== "debit") {
    throw new Error("invalid value of 'card_type'");
  }
};
