import { FilesInRequest } from './files';

export type TypedRequestOptions = {
  body: unknown;
  params: unknown;
  query: unknown;
  files: FilesInRequest<string> | never;
};

export type TypedRequest<Options extends TypedRequestOptions = TypedRequestOptions> = {
  userType: string | undefined;
  currentUser: any;
  DBConnection: any;
  tenantId: string;
  schoolTimeZone: string;
  userId: string;
  tokenExpires: number;
  id: string;
  language: string;
  container: any;
  school: string;
  currentConnection?: string;
} & Options;