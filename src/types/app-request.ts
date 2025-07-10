import { Request } from "express";
import { Connection } from "mongoose";
import { TLanguageEnum } from "../translation/constants";
import { BaseUser } from "./../shared/domain/baseUser.entity";
import { ID } from "./../shared/value-objects/ID.vo";
import { SubdomainVo } from "../shared/value-objects/Subdomain.vo";
import { OmitFromEnum } from "./../types/utils/enums.util";
import { TEndUserEnum } from "./../constants/globalEnums";

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export type FilesInRequest<UploadFields extends string> =
  | {
      [Field in UploadFields]?: File[];
    }
  | undefined;

export interface ProtectedRequestOptions {
  body?: unknown;
  params?: unknown;
  query?: unknown;
  files?: FilesInRequest<string>;
}

export interface JwtPayload {
  tenantId: string;
  countrySubdomain: string;
  userType: OmitFromEnum<TEndUserEnum, "master">;
  iat: number;
}

export interface BaseProtectedRequest extends Request {
  user: Omit<BaseUser, "roles"> /*& { roles: Role[] };*/;
  userType: OmitFromEnum<TEndUserEnum, "master">;
  conn: Connection;
  tenantId: ID;
  countrySubdomain: SubdomainVo;
  tokenExpires: number;
  language: TLanguageEnum;
}

export type DefaultRequestOptions = {
  body: never;
  params: never;
  query: never;
  files: never;
};

export type ProtectedRequest<
  Options extends ProtectedRequestOptions = DefaultRequestOptions
> = Omit<BaseProtectedRequest, "body" | "params" | "query" | "files"> & Options;
