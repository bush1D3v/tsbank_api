import { HttpStatusError } from "../../error";
import { DatabaseUserParams } from "../../models";

export default function undefinedEmail(user: undefined | DatabaseUserParams) {
  if (typeof user?.email === "undefined") {
    throw new HttpStatusError("invalid email", 401);
  }
};
