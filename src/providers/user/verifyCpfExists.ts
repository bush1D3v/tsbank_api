import { HttpStatusError } from "../../error";
import { getUserPerCpf } from "../../repositories";

export default async function verifyCpfExists(cpf: string) {
  const cpfExists = await getUserPerCpf(cpf);

  if (cpfExists) {
    throw new HttpStatusError("this cpf already used per other user", 409);
  }
};
