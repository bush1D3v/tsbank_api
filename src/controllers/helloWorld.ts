import { Request, Response } from "express";
import { handleError } from "../utils";

const helloWorld = (req: Request, res: Response) => {
  try {
    const message = `
      <div style="display: flex; justify-content: center; align-items: center; height: 97vh;">
        <h1 style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 50px;">
        🌎 Hello World! 🌎
        </h1>
      </div>
    `;

    return res.send(message);
  } catch (error: any) {
    handleError(res, error, 500);
  }
};

export default helloWorld;
