import { NextFunction, Request, Response } from "express";
import Logger from "../core/Logger";

export const logRequest = (req: Request, _: Response, next: NextFunction) => {
  Logger.info(`Received request : ${req.method} ${req.baseUrl}${req.url}`);
  next();
};
