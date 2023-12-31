import { HttpStatusError } from "../../error";

export default function undefinedUser(user: undefined | object) {
  if (typeof user === "undefined") {
    throw new HttpStatusError("user not found", 404);
  }
};
