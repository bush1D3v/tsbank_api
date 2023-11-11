import { HttpStatusError } from "../../error";
import { LoginUserParams } from "../../models";
import { getUserPerEmail } from "../../repositories";
import { createToken, validatePassword } from "../../utils";

export default async function loginUserAndReturn(params: LoginUserParams) {
  const user = await getUserPerEmail(params.email);

  if (typeof user === "undefined") {
    throw new HttpStatusError("invalid email", 401);
  }

  await validatePassword(params.password, user.password);

  const response = createToken(user);

  return response;
};
