import { NextFunction, Response } from "express";
import { ZodTypeAny } from "zod";
import { fromZodError } from "zod-validation-error";
import Logger from "../../Logger";
import { BadRequestError } from "../../ApplicationErrors";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { parseQuery } from "./queryValidation";

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

export class ValidateSchemaMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ) {}

  canActivate(): boolean {
    return this.routeConfig.bodySchema !== undefined || this.routeConfig.querySchema !== undefined || this.routeConfig.paramSchema !== undefined;
  }

  getMiddleware(): Middleware[] {
    if(this.routeConfig.bodySchema !== undefined){
      return [validateSchema(this.routeConfig.bodySchema, VALIDATION_SOURCE.BODY)];
    }
    if(this.routeConfig.querySchema !== undefined){
      return [parseQuery,validateSchema(this.routeConfig.querySchema, VALIDATION_SOURCE.QUERY)];
    }
    if(this.routeConfig.paramSchema !== undefined){
      return [parseQuery,validateSchema(this.routeConfig.paramSchema, VALIDATION_SOURCE.PARAM)];   
     }
     return [];
  }
}