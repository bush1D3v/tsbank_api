import { HttpStatusError } from "../../error";
import { getUserPerEmail } from "../../repositories";

export default async function verifyEmailExists(email: string) {
  const emailExists = await getUserPerEmail(email);

  if (emailExists) {
    throw new HttpStatusError("this email already used per other user", 409);
  }
};
