import { NextFunction, Response } from "express";
import { ClientSession, Connection } from "mongoose";
import { ZodTypeAny } from "zod";
import { TActionsEnum, TResourcesEnum } from "../../constants/ActionsResource";
import { TEndUserEnum } from "../../constants/globalEnums";
import { TLanguageEnum } from "../../translation/constants";
import {
  DefaultRequestOptions,
  ProtectedRequest,
  ProtectedRequestOptions,
} from "../../types/app-request";
import { ID } from "../../types/BaseEntity";
import { IUser } from "../../types/entities";
import { TypedContainer } from "../container/TypedContainer";
import { UploadOptions } from "../express/middlewares/upload";
import { APISuccessResponse } from "../responseAPI/APISuccessResponse";

export type RouteContextOptions = ProtectedRequestOptions;

export type RouteMethods = "get" | "post" | "patch" | "delete" | "put";

export type RouteContext<
  Options extends RouteContextOptions = DefaultRequestOptions,
  WithTransaction extends boolean = false,
> = {
  connection: Connection;
  session: WithTransaction extends true ? ClientSession : null;
  tenantId: ID;
  body: Options["body"];
  params: Options["params"];
  query: Options["query"];
  files: Options["files"];
  user: IUser;
  language: TLanguageEnum;
  endUser?: TEndUserEnum;
  headers: {
    "user-agent": string;
  };
  container: TypedContainer;
};

export type Middleware = (
  req: ProtectedRequest<any>,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export type Controller<Options extends RouteContextOptions> = (
  req: RouteContext<Options>,
) => Promise<APISuccessResponse>;

export type ControllerWithTransaction<Options extends RouteContextOptions> = (
  req: RouteContext<Options, true>,
) => Promise<APISuccessResponse>;

type AppendNeverToRequestOption<T extends RouteContextOptions> = (T extends { body: any }
  ? { body: T["body"] }
  : { body: never }) &
  (T extends { files: any } ? { files: T["files"] } : { files: never }) &
  (T extends { query: any } ? { query: T["query"] } : { query: never }) &
  (T extends { params: any } ? { params: T["params"] } : { params: never });

export type RouteTranslation<TranslationKeys extends string> = Record<
  TLanguageEnum,
  Record<TranslationKeys, string>
>;

type ControllerRouteConfig<RequestOptions extends RouteContextOptions> =
  | {
      controller: Controller<RequestOptions>;
      withTransaction?: false;
    }
  | {
      controller: ControllerWithTransaction<RequestOptions>;
      withTransaction: true;
    };

type BaseRouteConfig<RequestOptions extends RouteContextOptions, response = never> =
  | ({
      path: string;
      method: RouteMethods;
      endUser?: TEndUserEnum;
      isPublic?: boolean;
      translations?: RouteTranslation<any>[];
      authorization?: {
        action: TActionsEnum;
        resource: TResourcesEnum;
      };
      // enableExport?: false;
    } & ControllerRouteConfig<RequestOptions>)
  | ({
      path: string;
      method: "get" | "post";
      endUser: TEndUserEnum;
      isPublic?: false;
      translations?: RouteTranslation<any>[];
      authorization?: { action: TActionsEnum; resource: TResourcesEnum };
    } & ControllerRouteConfig<RequestOptions>);

type RouteConfig<
  RequestOptions extends RouteContextOptions,
  response extends {} | undefined = undefined,
> = (AppendNeverToRequestOption<RequestOptions>["body"] extends never
  ? { bodySchema?: undefined }
  : { bodySchema: ZodTypeAny }) &
  (AppendNeverToRequestOption<RequestOptions>["params"] extends never
    ? { paramSchema?: undefined }
    : { paramSchema: ZodTypeAny }) &
  (AppendNeverToRequestOption<RequestOptions>["query"] extends never
    ? { querySchema?: undefined }
    : { querySchema: ZodTypeAny }) &
  (AppendNeverToRequestOption<RequestOptions>["files"] extends never
    ? { upload?: undefined }
    : {
        upload: {
          fields: { name: keyof Exclude<RequestOptions["files"], undefined>; maxCount?: number }[];
          options?: UploadOptions;
        };
      }) &
  BaseRouteConfig<RequestOptions, response>;
