import { HttpStatusError } from "../../error";
import { validatePhone } from "../../repositories";

export default async function verifyPhoneExists(phone: string) {
  const phoneExists = await validatePhone(phone);

  if (phoneExists) {
    throw new HttpStatusError("this phone already used per other user", 409);
  }
};
