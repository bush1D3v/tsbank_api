import { HttpStatusError } from "../../error";
import { validateEmail } from "../../repositories";

export default async function verifyEmailExists(email: string) {
  const emailExists = await validateEmail(email);

  if (emailExists) {
    throw new HttpStatusError("this email already used per other user", 409);
  }
};
