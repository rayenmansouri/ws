import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { ObjectId, isValidObjectId } from "mongoose";
import stringValidator from "validator";
import { ZodTypeAny, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { FILE_EXPORT_EXTENSION_ENUM } from "../constants/fileExportExtension.constant";
import Logger from "../core/Logger";
import { QueryObject } from "../database/types";
import { ID } from "../types/BaseEntity";
import { stringToObjectId } from "./../helpers/stringToObjectId";
import { TValidationSourceEnum, VALIDATION_SOURCE } from "./express/middlewares/validateSchema";
import { BadRequestError } from "./ApplicationErrors";

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.code === "too_small" && error.type === "array")
    return { message: `the ${error.path[0]} are not enough` };

  if (error.code === "too_big" && error.type === "array")
    return { message: `the number of ${error.path[0]} is too big` };
  if (error.code === "invalid_enum_value") return { message: `invalid ${error.path[0]}` };
  return { message: `${ctx.defaultError} at ${error.path[0]} ` };
};
z.setErrorMap(customErrorMap);

let VALIDATION_DATE_STATE = false;

export const validateRequest =
  (schema: ZodTypeAny, source: TValidationSourceEnum = VALIDATION_SOURCE.BODY) =>
  async (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (VALIDATION_DATE_STATE) {
      Logger.error(`NEW VALIDATION DATE FAILED AT ${req.path}`);
      VALIDATION_DATE_STATE = false;
    }

    if (!result.success) {
      const error = fromZodError(result.error, {
        maxIssuesInMessage: 3,
        includePath: false,
      })
        .message.replace(/"([^"]*)"/g, "$1")
        .replace("Validation error: ", "")
        .trimEnd()
        .trimStart();
      Logger.error(error);
      next(new BadRequestError(error));
      return;
    }
    req[source] = { ...result.data, export: req.query.export };

    next();
  };

//* helper zod validation
// prettier-ignore
export const isValidISO8601Date = (dateString : Date | string) => moment(dateString, moment.ISO_8601, true).isValid();
export const isAlphaNum = (value: string): boolean => stringValidator.isAlphanumeric(value);

// prettier-ignore
export const subDomainValidation = () => z.string().min(2).max(64).refine(isAlphaNum, 'the subdomain must be alphanumeric');
export const emailValidation = () => z.string().email().toLowerCase();

// prettier-ignore
export const isValidDate = (dateString : Date | string) => moment(dateString, "YYYY-MM-DDTHH:mm:ss", true).isValid();

// prettier-ignore
export const validatePhoneNumber = () => z.string().refine((value) => stringValidator.isMobilePhone(value, 'any', { strictMode: false }) , "invalid phone number");
// prettier-ignore
export const validateNewId = () => z.string()
export const validateStringAsNumber = () =>
  z.string().refine(val => !isNaN(Number(val)), { message: "Invalid Number" });
// prettier-ignore
export const validateDate = () => z.date().or(z.string())
  .refine(value => {
    if (!isValidDate(value) && isValidISO8601Date(value)) VALIDATION_DATE_STATE = true
    if (isValidDate(value)) return true;
    return isValidISO8601Date(value);
    }, 'the date is invalid format').transform(value => new Date(value))

// prettier-ignore
export const validateMongodId = (message: string) => z.string().refine(isValidObjectId, `${message} is invalid`);

export const validateID = () =>
  z.custom<ID>(value => {
    if (typeof value === "string") return value;
    return false;
  }, `Invalid ID`);

export const validId = (message = "") =>
  z.custom<ObjectId>(value => {
    if (isValidObjectId(value) && typeof value === "string") return stringToObjectId(value);
    return false;
  }, `Invalid ${message || "id"} `);

export const queryObjectValidation = z.custom<QueryObject>(
  value => {
    const validateQuery = z.record(z.string(), z.string()).safeParse(value);
    return !!validateQuery.success;
  },
  { message: "Invalid query" },
);

export const validateEnum = <T extends object>(obj: T) =>
  z.custom<T[keyof T]>().refine(value => Object.values(obj).includes(value), {
    message: `Value must be one of ${Object.values(obj).join(", ")}`,
  });

export const paginationOptionsValidation = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
  sort: z.string().optional(),
  export: z.nativeEnum(FILE_EXPORT_EXTENSION_ENUM).optional(),
});
