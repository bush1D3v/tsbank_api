import { LoginUserParams } from "../../models";
import { undefinedEmail } from "../../providers";
import { getUserPerEmail } from "../../repositories";
import { createToken, validatePassword } from "../../utils";

export default async function loginUserAndReturn(params: LoginUserParams) {
  const user = await getUserPerEmail(params.email);

  undefinedEmail(user);

  await validatePassword(params.password, user.password);

  const response = createToken(user);

  return response;
};
