import { TranslationPaths } from "./../../translation/translationKeys";

export const APPLICATION_ERROR_TYPE_ENUM = {
  AUTH_FAILURE: "AUTH_FAILURE",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  BAD_REQUEST: "BAD_REQUEST",
  PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
  NOT_FOUND: "NOT_FOUND",
  FORBIDDEN: "FORBIDDEN",
} as const;
export type TApplicationErrorTypeEnum =
  (typeof APPLICATION_ERROR_TYPE_ENUM)[keyof typeof APPLICATION_ERROR_TYPE_ENUM];

export abstract class ApplicationError extends Error {
  constructor(
    public type: TApplicationErrorTypeEnum,
    public key: TranslationPaths | (string & {}),
    public data?: unknown
  ) {
    super();
  }
}

export class AuthFailureError extends ApplicationError {
  constructor(
    key: TranslationPaths | (string & {}) = "authentication.invalidCredentials",
    data?: unknown
  ) {
    super(APPLICATION_ERROR_TYPE_ENUM.AUTH_FAILURE, key, data);
  }
}

export class InternalError extends ApplicationError {
  constructor(
    key: TranslationPaths | (string & {}) = "global.internalError",
    data?: unknown
  ) {
    super(APPLICATION_ERROR_TYPE_ENUM.INTERNAL_ERROR, key, data);
  }
}

export class BadRequestError extends ApplicationError {
  constructor(key: TranslationPaths | (string & {}), data?: unknown) {
    super(APPLICATION_ERROR_TYPE_ENUM.BAD_REQUEST, key, data);
  }
}

export class payloadToLargeError extends ApplicationError {
  constructor(
    key: TranslationPaths | (string & {}) = "global.largePayload",
    data?: unknown
  ) {
    super(APPLICATION_ERROR_TYPE_ENUM.PAYLOAD_TOO_LARGE, key, data);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(key: TranslationPaths | (string & {}), data?: unknown) {
    super(APPLICATION_ERROR_TYPE_ENUM.NOT_FOUND, key, data);
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(
    key: TranslationPaths | (string & {}) = "global.permissionDenied",
    data?: unknown
  ) {
    super(APPLICATION_ERROR_TYPE_ENUM.FORBIDDEN, key, data);
  }
}
