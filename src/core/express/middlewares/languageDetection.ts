import { NextFunction, Response } from "express";
import { DEFAULT_LANGUAGE, LANGUAGE_ENUM, TLanguageEnum } from "../../../translation/constants";
import { BadRequestError } from "../../ApplicationErrors";
import { Middleware, TypedRequest } from "../types";
import { IMiddlewareFunction } from "./interface";
import { REQUEST_TOKEN_IDENTIFIER } from "../constant";
import { inject } from "../../container/TypedContainer";

export const languageDetectionMiddleware = (
  req: TypedRequest,
  _: Response,
  next: NextFunction,
): void => {
  const extractedLanguage = req.headers["content-language"];

  if (!extractedLanguage) {
    req.language = DEFAULT_LANGUAGE;
    next();
    return;
  }

  if (!Object.values(LANGUAGE_ENUM).includes(extractedLanguage as TLanguageEnum))
    throw new BadRequestError("Invalid language");

  req.language = extractedLanguage as TLanguageEnum;

  next();
};

export class LanguageDetectionMiddleware implements IMiddlewareFunction {
  canActivate(): boolean {
    return true;
  }

  getMiddleware(): Middleware[] {
    return [languageDetectionMiddleware];
  }
}

