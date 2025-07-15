import { NextFunction, Response } from "express";
import { ZodTypeAny } from "zod";
import { fromZodError } from "zod-validation-error";
import Logger from "../../Logger";
import { BadRequestError } from "../../ApplicationErrors";
import { TypedRequest } from "../types";

export const VALIDATION_SOURCE = {
  BODY: "body",
  HEADER: "headers",
  QUERY: "query",
  PARAM: "params",
} as const;
export type TValidationSourceEnum = (typeof VALIDATION_SOURCE)[keyof typeof VALIDATION_SOURCE];

export const validateSchema =
  (schema: ZodTypeAny, source: TValidationSourceEnum = VALIDATION_SOURCE.BODY) =>
  async (req: TypedRequest, _: Response, next: NextFunction): Promise<void> => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const error = fromZodError(result.error, {
        maxIssuesInMessage: 3,
        includePath: false,
      })
        .message.replace(/"([^"]*)"/g, "$1")
        .replace("Validation error: ", "")
        .trimEnd();
      Logger.error(error);
      next(new BadRequestError(error));
      return;
    }
    req[source] = result.data;

    next();
  };
