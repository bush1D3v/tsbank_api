import { HttpStatusError } from "../../error";
import { validateEmail, validatePassword } from "../../repositories";
import { createToken } from "../../utils";

export default async function loginUserAndReturn(email: string, password: string) {
  const user = await validateEmail(email);

  if (typeof user === "undefined") {
    throw new HttpStatusError("Invalid email", 401);
  }

  await validatePassword(password, user.password);

  const response = createToken(user);

  return response;
};
