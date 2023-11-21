import { compare } from "bcrypt";
import { LoginUserParams } from "../../models";
import { getUserPerEmail } from "../../repositories";
import { createToken } from "../../utils";
import { HttpStatusError } from "../../error";

export default async function loginUserAndReturn(params: LoginUserParams) {
  const user = await getUserPerEmail(params.email);

  if (!user) {
    throw new HttpStatusError("invalid email and/or password", 401);
  }

  const validPassword = await compare(params.password, user.password);

  if (!validPassword) {
    throw new HttpStatusError("invalid email and/or password", 401);
  }

  const response = createToken(user);

  return response;
};
