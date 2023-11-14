import { HttpStatusError } from "../../error";

export default function validateOutput(actualBalance: number, outputValue: number) {
  if (actualBalance < outputValue) {
    throw new HttpStatusError("insufficient balance to perform the transaction", 400);
  }
};
