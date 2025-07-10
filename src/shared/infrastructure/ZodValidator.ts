import { NextFunction, Request, Response } from "express";
import moment from "moment";
import stringValidator from "validator";
import { ZodTypeAny, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { BadRequestError } from "../../core/ApplicationErrors";
import {
  TValidationSourceEnum,
  VALIDATION_SOURCE,
} from "../../core/express/types";
import Logger from "../../core/Logger";
import { ID } from "../value-objects/ID.vo";

type QueryObject = Record<string, string | undefined>;

export class CustomZodValidator {
  private static customErrorMap: z.ZodErrorMap = (error, ctx) => {
    if (error.code === "too_small" && error.type === "array")
      return { message: `the ${error.path[0]} are not enough` };
    if (error.code === "too_big" && error.type === "array")
      return { message: `the number of ${error.path[0]} is too big` };
    if (error.code === "invalid_enum_value")
      return { message: `invalid ${error.path[0]}` };
    return { message: `${ctx.defaultError} at ${error.path[0]} ` };
  };

  static {
    z.setErrorMap(this.customErrorMap);
  }

  static validateRequest(
    schema: ZodTypeAny,
    source: TValidationSourceEnum = VALIDATION_SOURCE.BODY
  ): (req: Request, _: Response, next: NextFunction) => Promise<void> {
    return async (
      req: Request,
      _: Response,
      next: NextFunction
    ): Promise<void> => {
      const result = schema.safeParse(req[source]);
      if (!result.success) {
        Logger.error(fromZodError(result.error).message);
        next(new BadRequestError(fromZodError(result.error).message));
        return;
      }
      next();
    };
  }
  static isValidISO8601Date(dateString: Date | string): boolean {
    return moment(dateString, moment.ISO_8601, true).isValid();
  }

  static isAlphaNum(value: string): boolean {
    return stringValidator.isAlphanumeric(value);
  }

  static subDomainValidation(): z.ZodType<string, z.ZodTypeDef, string> {
    return z
      .string()
      .min(2)
      .max(64)
      .refine(
        CustomZodValidator.isAlphaNum,
        "the subdomain must be alphanumeric"
      );
  }

  static validateNewId(): z.ZodString {
    return z.string();
  }

  static validateStringAsNumber(): z.ZodType<string, z.ZodTypeDef, string> {
    return z
      .string()
      .refine((val) => !isNaN(Number(val)), { message: "Invalid Number" });
  }

  static validateDate(): z.ZodType<Date | string, z.ZodTypeDef, Date | string> {
    return z
      .date()
      .or(z.string())
      .refine(
        (value) => {
          if (typeof value === "string") {
            return CustomZodValidator.isValidISO8601Date(value);
          }
          return true;
        },
        { message: "Invalid date format" }
      );
  }

  static validateID(): z.ZodType<ID, z.ZodTypeDef, ID> {
    return z.custom<ID>((value) => {
      if (typeof value === "string") return value;
      return false;
    }, `Invalid ID`);
  }

  static validateQueryObject(): z.ZodType<
    QueryObject,
    z.ZodTypeDef,
    QueryObject
  > {
    return z.custom<QueryObject>(
      (value) => {
        const validateQuery = z.record(z.string(), z.string()).safeParse(value);
        return !!validateQuery.success;
      },
      { message: "Invalid query" }
    );
  }

  static validateEnum<T extends object>(
    obj: T
  ): z.ZodType<T[keyof T], z.ZodTypeDef, T[keyof T]> {
    return z
      .custom<T[keyof T]>()
      .refine((value) => Object.values(obj).includes(value), {
        message: `Value must be one of ${Object.values(obj).join(", ")}`,
      });
  }
}
