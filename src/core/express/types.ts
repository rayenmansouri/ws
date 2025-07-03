import { BaseUser } from "./../../shared/domain/baseUser.entity";
import { ID } from "./../../shared/value-objects/ID.vo";
import { Connection } from "mongoose";
import { TActionsEnum, TResourcesEnum } from "../../constants/ActionsResource";
import { TEndUserEnum } from "../../constants/globalEnums";
import { TypedContainer } from "../container/TypedContainer";
import { UploadOptions } from "./middlewares/upload";
import { TLanguageEnum } from "../../translation/constants";
import { FilesInRequest } from "../../types/app-request";
import { OmitFromEnum, PickFromEnum } from "../../types/utils/enums.util";
import { BaseController } from "./controllers/BaseController";
import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodTypeAny } from "zod";

// import { Role } from "../../feature/authorization/domain/role.entity";

export type Middleware = (
  req: TypedRequest<TypedRequestOptions>,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type BaseTypedRequest = Request & {
  userType: TEndUserEnum | undefined;
  user: Omit<BaseUser, "roles"> /*& { roles: Role[] }*/;
  DBConnection: Connection;
  tenantId: ID;
  schoolTimeZone: string;
  userId: string;
  tokenExpires: number;
  id: string;
  language: TLanguageEnum;
  container: TypedContainer;
  school: string;
};

export type TypedRequestOptions = {
  body: unknown;
  params: unknown;
  query: unknown;
  files: FilesInRequest<string>;
};

export type TypedRequest<
  Options extends TypedRequestOptions = TypedRequestOptions
> = Omit<BaseTypedRequest, "body" | "params" | "query" | "files"> & Options;

type ExtractRouteParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<`/${Rest}`>
    : T extends `${string}:${infer Param}`
    ? Param
    : never;

export const PLATFORM_ENUM = {
  WEB: "web",
  MOBILE: "mobile",
  INTERNAL: "internal",
} as const;
export type TPlatformEnum = (typeof PLATFORM_ENUM)[keyof typeof PLATFORM_ENUM];

export type RouteConfiguration<
  Options extends TypedRequestOptions,
  Path extends string
> = {
  path: Path;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controller: (new (...args: any[]) => BaseController<Options>) & {
    uuid?: string;
  };
  isTransactionEnabled?: boolean;
  platform: TPlatformEnum;
} & (
  | {
      endUser: PickFromEnum<TEndUserEnum, "admin" | "teacher" | "master">;
      authorization?: {
        action: TActionsEnum;
        resource: TResourcesEnum;
      };
      isPublic?: false;
    }
  | {
      endUser: OmitFromEnum<TEndUserEnum, "admin" | "teacher" | "master">;
      authorization?: never;
      isPublic?: false;
    }
  | {
      endUser?: TEndUserEnum;
      authorization?: never;
      isPublic: true;
    }
) &
  (
    | {
        method: "get";
        bodySchema?: undefined;
      }
    | ({
        method: "post" | "patch" | "delete" | "put";
      } & (Options["body"] extends never
        ? { bodySchema?: undefined }
        : { bodySchema: ZodTypeAny }))
  ) &
  (ExtractRouteParams<Path> extends never
    ? { paramSchema?: undefined }
    : {
        paramSchema: ZodObject<{
          [Param in ExtractRouteParams<Path>]: ZodTypeAny;
        }>;
      }) &
  (Options["query"] extends never
    ? { querySchema?: undefined }
    : { querySchema: ZodTypeAny }) &
  (Options["files"] extends never
    ? { upload?: undefined }
    : {
        upload: {
          fields: {
            name: keyof Exclude<Options["files"], undefined>;
            maxCount?: number;
          }[];
          options?: UploadOptions;
        };
      });
