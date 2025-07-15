import { NextFunction, Response } from "express";
import { BadRequestError } from "../core/ApplicationErrors";
import { ProtectedRequest } from "../types/app-request";
import { DEFAULT_LANGUAGE, LANGUAGE_ENUM, TLanguageEnum } from "../translation/constants";

export const translationMiddleware = (
  req: ProtectedRequest,
  _: Response,
  next: NextFunction,
): void => {
  const extractedLanguage = req.headers["content-language"] as TLanguageEnum;

  if (!extractedLanguage) {
    req.language = DEFAULT_LANGUAGE;
    next();
    return;
  }

  if (!Object.values(LANGUAGE_ENUM).includes(extractedLanguage))
    throw new BadRequestError("Invalid language");

  req.language = extractedLanguage;

  next();
};
