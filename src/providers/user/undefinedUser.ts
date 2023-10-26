import { HttpStatusError } from "../../error";

const undefinedUser = (user: undefined | object) => {
  if (typeof user === "undefined") {
    throw new HttpStatusError("User not found", 404);
  }
};

export default undefinedUser;
