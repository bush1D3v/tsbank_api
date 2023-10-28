import { HttpStatusError } from "../../error";
import { validateEmail, validatePassword } from "../../repositories";
import { createToken } from "../../utils";

export default async function loginUserAndReturn(email: string, password: string) {
  const user = await validateEmail(email);

  const validPassword = await validatePassword(password, user.password);

  if (typeof user === "undefined" || !validPassword) {
    throw new HttpStatusError("Invalid email and/or password", 401);
  }

  const response = createToken(user);

  return response;
};
