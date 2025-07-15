import { NextFunction, Response } from "express";
import { Middleware, TypedRequest } from "../types";
import { ApplicationError } from "../../ApplicationErrors";
import { APIErrorResponse } from "../../responseAPI/APIErrorResponse";

export const asyncHandlerForMiddleware = (middleware: Middleware): Middleware => {
  return async (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (Error: unknown) {
      if (Error instanceof ApplicationError) {
        const apiErrorResponse = new APIErrorResponse(Error);
        apiErrorResponse.setLanguage(req.language);
        next(apiErrorResponse);
        return;
      }
      next(Error);
    }
  };
};
