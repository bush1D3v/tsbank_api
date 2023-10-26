import { HttpStatusError } from "../../error";
import { validateEmail, validatePassword } from "../../repositories";
import { createToken } from "../../utils";

const loginUserAndReturn = async (email: string, password: string) => {
  const user = await validateEmail(email);

  const validPassword = await validatePassword(password, user.password);

  if (typeof user === "undefined" || !validPassword) {
    throw new HttpStatusError("Invalid email and/or password", 401);
  }

  const response = createToken(user);

  return response;
};

export default loginUserAndReturn;
