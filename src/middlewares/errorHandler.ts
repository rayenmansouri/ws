import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import {
  ErrorExtended,
  handelConflictWrite,
  handelUnspottedFile,
  handleCastIdError,
  handleDuplicateError,
  handleLimitFileSizeError,
} from "../core/ErrorHandlers";
import Logger from "../core/Logger";
import { ApplicationError, InternalError } from "../core/ApplicationErrors";
import { ErrorsCode } from "../helpers/constants";
import { APIErrorResponse } from "../core/responseAPI/APIErrorResponse";

export const errorHandler = (
  err: ErrorExtended,
  req: Request,
  res: Response,
  __: NextFunction,
): void => {
  if (err instanceof ApplicationError) {
    const apiErrorResponse = new APIErrorResponse(err);

    if (err instanceof InternalError) {
      Logger.fatal(err.message + err.stack);
    }

    //@ts-expect-error - this need to be refactored later when we get rid of the old architecture
    apiErrorResponse.setLanguage(req.language);
    apiErrorResponse.send(res);
    return;
  }

  if (err instanceof APIErrorResponse) {
    //@ts-expect-error - this need to be refactored later when we get rid of the old architecture
    err.setLanguage(req.language);
    err.send(res);
    return;
  }

  let finalError: APIErrorResponse;

  if (err.code === ErrorsCode.MONGODB_DUPLICATE_ERROR_CODE) finalError = handleDuplicateError(err);
  else if (String(err.code) === "LIMIT_FILE_SIZE") finalError = handleLimitFileSizeError();
  else if (err.kind === "ObjectId") finalError = handleCastIdError(`Invalid Id (${err.value})`);
  else if (err.code?.toString() === "LIMIT_UNEXPECTED_FILE")
    finalError = handelUnspottedFile((err as unknown as MulterError).field);
  else if (
    err.constructor.name === "MongoServerError" &&
    err.code === ErrorsCode.MONGODB_WRITE_CONFLICT_ERROR_CODE
  )
    finalError = handelConflictWrite();
  else {
    Logger.fatal(err.message + err.stack);
    finalError = new APIErrorResponse(new InternalError());
  }
  finalError.send(res);
};
