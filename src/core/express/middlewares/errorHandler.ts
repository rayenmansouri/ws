import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { ApplicationError, InternalError } from "../../ApplicationErrors";
import Logger from "../../Logger";
import { APIErrorResponse } from "../../responseAPI/APIErrorResponse";
import {
  ErrorExtended,
  ErrorHandler,
} from "./../../../shared/Application/Error.handlers";

export class ErrorHandlerMiddleware {
  private static MONGODB_DUPLICATE_ERROR_CODE: 11000;
  private static MONGODB_WRITE_CONFLICT_ERROR_CODE: 112;

  public static handle(
    err: ErrorExtended,
    req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    if (err instanceof ApplicationError) {
      ErrorHandlerMiddleware.handleApplicationError(err, req, res);
      return;
    }

    if (err instanceof APIErrorResponse) {
      ErrorHandlerMiddleware.handleAPIErrorResponse(err, req, res);
      return;
    }

    ErrorHandlerMiddleware.handleGenericError(err, res);
  }

  private static handleApplicationError(
    err: ApplicationError,
    req: Request,
    res: Response
  ): void {
    const apiErrorResponse = new APIErrorResponse(err);

    if (err instanceof InternalError) {
      Logger.fatal(err.message + err.stack);
    }
    // TODO: fix this
    // @ts-expect-error - this need to be refactored later when we get rid of the old architecture
    apiErrorResponse.setLanguage(req.language);
    apiErrorResponse.send(res);
  }

  private static handleAPIErrorResponse(
    err: APIErrorResponse,
    req: Request,
    res: Response
  ): void {
    // @ts-expect-error - this need to be refactored later when we get rid of the old architecture
    err.setLanguage(req.language);
    err.send(res);
  }

  private static handleGenericError(err: ErrorExtended, res: Response): void {
    let finalError: APIErrorResponse;

    if (err.code === ErrorHandlerMiddleware.MONGODB_DUPLICATE_ERROR_CODE) {
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
      err.constructor.name === "MongoServerError" &&
      err.code === ErrorHandlerMiddleware.MONGODB_WRITE_CONFLICT_ERROR_CODE
    ) {
      finalError = ErrorHandler.handelConflictWrite();
    } else {
      Logger.fatal(err.message + err.stack);
      finalError = new APIErrorResponse(new InternalError());
    }

    finalError.send(res);
  }
}
