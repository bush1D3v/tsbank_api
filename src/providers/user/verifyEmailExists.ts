import { HttpStatusError } from "../../error";
import { validateEmail } from "../../repositories";

export default async function verifyEmailExists(email: string) {
  const emailExists = await validateEmail(email);

  if (emailExists) {
    throw new HttpStatusError("Email already exists", 409);
  }
};
