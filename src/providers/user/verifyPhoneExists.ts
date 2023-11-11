import { HttpStatusError } from "../../error";
import { getUserPerPhone } from "../../repositories";

export default async function verifyPhoneExists(phone: string) {
  const phoneExists = await getUserPerPhone(phone);

  if (phoneExists) {
    throw new HttpStatusError("this phone already used per other user", 409);
  }
};
