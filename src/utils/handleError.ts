import { Response } from "express";

const handleError = (response: Response, error: any, statusCode: number) => {
  if (error instanceof Error) {
    response.status(statusCode).json({ message: error.message });
  } else {
    response.status(500).json({ message: "Internal server error" });
  }
};

export default handleError;
