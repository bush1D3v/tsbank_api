import db from "../../../src/data/connection";

export default async function deleteCard(cardType: string | null) {
  await db(cardType + "_cards").delete();
};
