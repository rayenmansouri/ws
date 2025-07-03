import { APPLICATION_ERROR_TYPE_ENUM, ApplicationError } from "../ApplicationErrors";
import { APIResponse, ErrorResponseStatusCodeEnum, RESPONSE_STATUS_ENUM } from "./APIResponse";

export class APIErrorResponse extends APIResponse {
  constructor(applicationError: ApplicationError) {
    let statusCode: ErrorResponseStatusCodeEnum;
    switch (applicationError.type) {
      case APPLICATION_ERROR_TYPE_ENUM.AUTH_FAILURE:
        statusCode = ErrorResponseStatusCodeEnum.UNAUTHORIZED;
        break;
      case APPLICATION_ERROR_TYPE_ENUM.BAD_REQUEST:
        statusCode = ErrorResponseStatusCodeEnum.BAD_REQUEST;
        break;
      case APPLICATION_ERROR_TYPE_ENUM.PAYLOAD_TOO_LARGE:
        statusCode = ErrorResponseStatusCodeEnum.PAYLOAD_TOO_LARGE;
        break;
      case APPLICATION_ERROR_TYPE_ENUM.INTERNAL_ERROR:
        statusCode = ErrorResponseStatusCodeEnum.INTERNAL_ERROR;
        break;
      case APPLICATION_ERROR_TYPE_ENUM.NOT_FOUND:
        statusCode = ErrorResponseStatusCodeEnum.NOT_FOUND;
        break;
      case APPLICATION_ERROR_TYPE_ENUM.FORBIDDEN:
        statusCode = ErrorResponseStatusCodeEnum.FORBIDDEN;
        break;
    }
    super(statusCode, applicationError.key, RESPONSE_STATUS_ENUM.ERROR, applicationError.data);
  }
}
