import { Response } from "express";
import { parseDate } from "../../helpers/parseDate";
import { TLanguageEnum } from "../../translation/constants";
import { translate } from "../../translation/helper/translate";
import { TranslationPaths } from "../../translation/translationKeys";
import { RouteTranslation } from "../Routes/createRoutes";

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
  private translations: RouteTranslation<any>[] | undefined = undefined;
  private language: TLanguageEnum | undefined = undefined;

  constructor(
    public statusCode: SuccessResponseStatusCodeEnum | ErrorResponseStatusCodeEnum,
    public key: TranslationPaths | (string & {}),
    public status: TResponseStatusEnum,
    public data?: any,
  ) {}

  send(res: Response): void {
    let translatedMessage: string | undefined = undefined;

    if (this.translations && this.language) translatedMessage = this.translateMessage();

    if (!translatedMessage && this.language) translatedMessage = translate(this.key, this.language);

    res.statusCode = this.statusCode;

    res.json({
      status: this.status,
      key: this.key,
      message: translatedMessage || this.key,
      data: parseDate(this.data),
    });
  }

  translateMessage(): string | undefined {
    if (!this.translations || !this.language) return;

    for (const routeTranslation of this.translations) {
      const translatedMessage = routeTranslation[this.language][this.key];
      if (translatedMessage) return translatedMessage;
    }
  }

  // getTranslation(): string {
  //   const paths = this.key.split(".") as ExtractedArray;

  //   let translatedMessage: TranslationObject | string = translation[this.language!];

  //   while (paths.length > 0) {
  //     if (typeof translatedMessage != "string") {
  //       //@ts-expect-error
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //       translatedMessage = translatedMessage[paths[0]];
  //     }
  //     paths.shift();
  //   }

  //   return translatedMessage as string;
  // }

  setTranslation(translations: RouteTranslation<any>[]): void {
    this.translations = translations;
  }

  setLanguage(language: TLanguageEnum): void {
    this.language = language;
  }
}

type Split<T extends string> = T extends `${infer Prefix}.${infer Suffix}` ? [Prefix, Suffix] : [T];

// Transform the union type into an array of strings
type ExtractedArray = Split<TranslationPaths>[1][];
