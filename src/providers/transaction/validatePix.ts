import { HttpStatusError } from "../../error";

export default function validatePix(reqCpf: string, userCpf: string) {
  if (reqCpf === userCpf) {
    throw new HttpStatusError("it's not possible to make a pix for yourself", 400);
  }
};
