import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import Logger from "../../Logger";
import { ApplicationError, InternalError } from "../../ApplicationErrors";
import { APIErrorResponse } from "../../responseAPI/APIErrorResponse";
import {
  ErrorExtended,
  ErrorHandler,
} from "../../../shared/Application/Error.handlers";

const ErrorsCode = {
  MONGODB_DUPLICATE_ERROR_CODE: 11000,
  MONGODB_WRITE_CONFLICT_ERROR_CODE: 112,
};

export const globalErrorHandlerMiddleware = (
  err: ErrorExtended,
  req: Request,
  res: Response,
  _: NextFunction
): void => {
  if (err instanceof ApplicationError) {
    const apiErrorResponse = new APIErrorResponse(err);

    if (err instanceof InternalError) {
      Logger.fatal(err.message + err.stack);
    }

    if (typeof apiErrorResponse.setLanguage === "function") {
      //@ts-expect-error
      apiErrorResponse.setLanguage(req.language);
    }
    apiErrorResponse.send(res);
    return;
  }

  if (err instanceof APIErrorResponse) {
    if (typeof err.setLanguage === "function") {
      //@ts-expect-error
      err.setLanguage(req.language);
    }
    err.send(res);
    return;
  }

  let finalError: APIErrorResponse | undefined;

  if (err.code === ErrorsCode.MONGODB_DUPLICATE_ERROR_CODE) {
    finalError = ErrorHandler.handleDuplicateError(err);
  } else if (String(err.code) === "LIMIT_FILE_SIZE") {
    finalError = ErrorHandler.handleLimitFileSizeError();
  } else if (err.kind === "ObjectId") {
    finalError = ErrorHandler.handleCastIdError(`Invalid Id (${err.value})`);
  } else if (err.code?.toString() === "LIMIT_UNEXPECTED_FILE") {
    finalError = ErrorHandler.handelUnspottedFile(
      (err as unknown as MulterError).field
    );
  } else if (
    err.constructor?.name === "MongoServerError" &&
    err.code === ErrorsCode.MONGODB_WRITE_CONFLICT_ERROR_CODE
  ) {
    finalError = ErrorHandler.handelConflictWrite();
  }

  if (!finalError) {
    Logger.fatal(err.message + err.stack);
    finalError = new APIErrorResponse(new InternalError());
  }

  finalError.send(res);
};
