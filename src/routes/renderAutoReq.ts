import express from "express";
import { Request, Response } from "express";

const renderReq = express();

async function renderAutoReq(req: Request, res: Response) {
  return res.send("Pong");
};

renderReq.get(
  "/ping",
  renderAutoReq
);

export default renderAutoReq;
