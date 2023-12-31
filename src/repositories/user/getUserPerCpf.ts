import db from "../../data/connection";
import { DatabaseUserParams } from "../../models";

export default async function getUserPerCpf(cpf: string) {
  const user: DatabaseUserParams = await db("users").where({ cpf }).first();

  return user;
};
