import { HttpStatusError } from "../../error";
import { validateCpf } from "../../repositories";

export default async function verifyCpfExists(cpf: string) {
  const cpfExists = await validateCpf(cpf);

  if (cpfExists) {
    throw new HttpStatusError("this cpf already used per other user", 409);
  }
};
