import { UserParams } from "../../models";
import { createNewUser } from "../../repositories";
import { encryptPassword } from "../../utils";
import {
  verifyCpfExists,
  verifyEmailExists,
  verifyPhoneExists
} from "../../providers";

export default async function insertUserAndReturn(params: UserParams) {
  const result = await Promise.all([
    verifyEmailExists(params.email),
    verifyCpfExists(params.cpf),
    verifyPhoneExists(params.phone),
    encryptPassword(params.password)
  ]);

  const cryptPassword = result[ 3 ];

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
