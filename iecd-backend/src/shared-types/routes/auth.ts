import { BaseUser } from '../entities';
import { TypedRequestOptions } from '../common';

export type LoginRouteConfig = TypedRequestOptions & {
  body: {
    credential: string;
    password: string;
  };
  params: never;
  query: never;
  files: never;
};

export type LoginResponse = { 
  token: string;
  user: BaseUser;
};