import {
  BadRequestError,
  payloadToLargeError,
} from "../../core/ApplicationErrors";
import { APIErrorResponse } from "../../core/responseAPI/APIErrorResponse";

export const MAX_FILE_SIZE_IN_MB = 2;

export interface ErrorExtended extends Error {
  code?: number;
  keyValue?: object;
  kind?: string;
  value?: string;
}

export class ErrorHandler {
  static handleDuplicateError(err: ErrorExtended): APIErrorResponse {
    const [key] = Object.entries(err.keyValue as object).flat();
    const message = `${key} is already in use`;
    const error = new BadRequestError(message);
    return new APIErrorResponse(error);
  }

  static handleCastIdError(msg = "Invalid"): APIErrorResponse {
    const error = new BadRequestError(msg);
    return new APIErrorResponse(error);
  }

  static handelConflictWrite(): APIErrorResponse {
    const error = new BadRequestError("Document are locked please try again");
    return new APIErrorResponse(error);
  }

  static handleLimitFileSizeError(): APIErrorResponse {
    const error = new payloadToLargeError(
      `File is too large - Maximum File Size is ${MAX_FILE_SIZE_IN_MB}MB`
    );
    return new APIErrorResponse(error);
  }

  static handelUnspottedFile(filedName?: string): APIErrorResponse {
    const error = new BadRequestError(`Invalid file name: ` + filedName);
    return new APIErrorResponse(error);
  }
}
