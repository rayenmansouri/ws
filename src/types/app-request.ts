import { BaseUser } from "./../shared/domain/baseUser.entity";
import { ID } from "./../shared/value-objects/ID.vo";
import { Request } from "express";
import * as core from "express-serve-static-core";
import { Connection } from "mongoose";
import { TLanguageEnum } from "../translation/constants";
import { IUser } from "./entities";

export interface PublicRequest<T = unknown>
  extends Request<core.ParamsDictionary, unknown, T> {
  user: IUser;
  conn: Connection;
  tenantId: string;
}

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

export interface BaseProtectedRequest extends Request {
  user: Omit<BaseUser, "roles"> /*& { roles: Role[] };*/;
  conn: Connection;
  newConnection: Connection;
  tenantId: ID;
  schoolTimeZone: string;
  userId: string;
  tokenExpires: number;
  id: string;
  language: TLanguageEnum;
  school: string;
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
