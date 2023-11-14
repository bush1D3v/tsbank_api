import { UserParams } from "../../models";
import { createNewUser } from "../../repositories";
import { encryptPassword } from "../../utils";
import {
  verifyCpfExists,
  verifyEmailExists,
  verifyPhoneExists
} from "../../providers";

export default async function insertUserAndReturn(params: UserParams) {
  await verifyEmailExists(params.email);

  await verifyCpfExists(params.cpf);

  await verifyPhoneExists(params.phone);

  const cryptPassword = await encryptPassword(params.password);

  const newUser = {
    name: params.name,
    email: params.email,
    password: cryptPassword,
    cpf: params.cpf,
    phone: params.phone
  };

  const user = await createNewUser(newUser);

  return user;
};
