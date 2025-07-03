import { NextFunction } from "express";
import { BadRequestError } from "../../ApplicationErrors";
import { TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";

export const parseQuery = asyncHandlerForMiddleware((req: TypedRequest, _, next: NextFunction) => {
  // @ts-expect-error - This is needed to parse the JSON
  const queryJSON = req.query?.JSON as string | undefined;

  if (queryJSON) {
    try {
      req.query = JSON.parse(queryJSON);
    } catch {
      next(new BadRequestError("global.invalidJSON"));
    }
  } else req.query = {};

  next();
});
