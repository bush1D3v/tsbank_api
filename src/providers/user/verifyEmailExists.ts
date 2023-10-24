import { Request } from "express";
import { HttpStatusError } from "../../error";
import { validateEmail } from "../../repositories";

const verifyEmailExists = async (req: Request) => {
  const { email } = req.body;
  const emailExists = await validateEmail(email);

  if (emailExists) {
    throw new HttpStatusError("Email already exists", 409);
  }
};

export default verifyEmailExists;
