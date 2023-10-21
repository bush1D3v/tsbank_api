import { validateEmail, validatePassword } from "../../repositories";
import { createToken } from "../../utils";

const loginUserAndReturn = async (email: string, password: string) => {
  const user = await validateEmail(email);

  if (typeof user === "undefined") {
    throw new Error("Invalid email and/or password");
  }

  const validPassword = await validatePassword(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid email and/or password");
  }

  const response = createToken(user);

  return response;
};

export default loginUserAndReturn;
