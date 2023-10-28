import { UserParams } from "../../models";
import { verifyEmailExists } from "../../providers";
import { createNewUser } from "../../repositories";
import { encryptPassword } from "../../utils";

export default async function insertUserAndReturn(params: UserParams) {
  await verifyEmailExists(params.email);

  const cryptPassword = await encryptPassword(params.password);

  const newUser = {
    name: params.name,
    email: params.email,
    password: cryptPassword
  };

  const user = await createNewUser(newUser);

  return user;
};
