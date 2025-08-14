import { BadRequestError, PayloadTooLargeError } from "./ApplicationErrors";
import { MAX_FILE_SIZE_IN_MB } from "./express/middlewares/upload";
import { APIErrorResponse } from "./responseAPI/APIErrorResponse";

export interface ErrorExtended extends Error {
  code?: number;
  keyValue?: object;
  kind?: string;
  value?: string;
}

export const handleDuplicateError = (err: ErrorExtended): APIErrorResponse => {
  const [key] = Object.entries(err.keyValue as object).flat();
  const message = `${key} is already in use`;
  const error = new BadRequestError(message);
  return new APIErrorResponse(error);
};

export const handleCastIdError = (msg = "Invalid"): APIErrorResponse => {
  const error = new BadRequestError(msg);
  return new APIErrorResponse(error);
};
export const handelConflictWrite = (): APIErrorResponse => {
  const error = new BadRequestError("Document are locked please try again");
  return new APIErrorResponse(error);
};

export const handleLimitFileSizeError = (): APIErrorResponse => {
  const error = new PayloadTooLargeError(
    `File is too large - Maximum File Size is ${MAX_FILE_SIZE_IN_MB}MB`,
  );
  return new APIErrorResponse(error);
};
export const handelUnspottedFile = (filedName?: string): APIErrorResponse => {
  const error = new BadRequestError(`Invalid file name: ` + filedName);
  return new APIErrorResponse(error);
};
