import { Response } from "express";
import HttpStatusError from "./HttpStatusError";

const handleError = (response: Response, error: Error | HttpStatusError, statusCode: number) => {
  if (error instanceof HttpStatusError) {
    response.status(error.statusCode).json({ message: error.message });
  }
  else if (error instanceof Error) {
    response.status(statusCode).json({ message: error.message });
  } else {
    response.status(500).json({ message: "Internal server error" });
  }
};

export default handleError;
