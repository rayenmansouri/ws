import { TranslationPaths } from "../../translation/translationKeys";
import { APIResponse, RESPONSE_STATUS_ENUM, SuccessResponseStatusCodeEnum } from "./APIResponse";

export abstract class APISuccessResponse extends APIResponse {
  constructor(statusCode: SuccessResponseStatusCodeEnum, key: string, data?: unknown) {
    super(statusCode, key, RESPONSE_STATUS_ENUM.SUCCESS, data);
  }
}

export class SuccessResponse<T> extends APISuccessResponse {
  constructor(key: TranslationPaths | (string & {}), data?: T) {
    super(SuccessResponseStatusCodeEnum.SUCCESS, key, data);
  }
}

export class SuccessCreateResponse<T> extends APISuccessResponse {
  constructor(key: TranslationPaths | (string & {}), data?: T) {
    super(SuccessResponseStatusCodeEnum.SUCCESS_CREATE, key, data);
  }
}

export class SuccessUpdateResponse<T> extends APISuccessResponse {
  constructor(key: TranslationPaths | (string & {}), data?: T) {
    super(SuccessResponseStatusCodeEnum.SUCCESS_UPDATE, key, data);
  }
}
