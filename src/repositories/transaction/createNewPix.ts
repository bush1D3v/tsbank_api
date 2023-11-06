import db from "../../data/connection";
import { NewPixParams } from "../../models";

export default async function createNewPix(params: NewPixParams) {
  await db("users").increment({ "balance": params.value }).where({ cpf: params.cpf });
  await db("users").decrement({ "balance": params.value }).where({ id: params.user_id });
};
