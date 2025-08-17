export enum ErrorResponseStatusCodeEnum {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  PAYLOAD_TOO_LARGE = 413,
  INTERNAL_ERROR = 500,
}

export enum SuccessResponseStatusCodeEnum {
  SUCCESS = 200,
  SUCCESS_CREATE = 201,
  SUCCESS_UPDATE = 204,
}

export const RESPONSE_STATUS_ENUM = {
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type TResponseStatusEnum = (typeof RESPONSE_STATUS_ENUM)[keyof typeof RESPONSE_STATUS_ENUM];

export abstract class APIResponse {
  constructor(
    public statusCode: SuccessResponseStatusCodeEnum | ErrorResponseStatusCodeEnum,
    public key: string,
    public status: TResponseStatusEnum,
    public data?: any,
  ) {}
}

export class SuccessResponse<T> extends APIResponse {
  constructor(key: string, data?: T) {
    super(SuccessResponseStatusCodeEnum.SUCCESS, key, RESPONSE_STATUS_ENUM.SUCCESS, data);
  }
}

export class SuccessCreateResponse<T> extends APIResponse {
  constructor(key: string, data?: T) {
    super(SuccessResponseStatusCodeEnum.SUCCESS_CREATE, key, RESPONSE_STATUS_ENUM.SUCCESS, data);
  }
}

export class SuccessUpdateResponse<T> extends APIResponse {
  constructor(key: string, data?: T) {
    super(SuccessResponseStatusCodeEnum.SUCCESS_UPDATE, key, RESPONSE_STATUS_ENUM.SUCCESS, data);
  }
}