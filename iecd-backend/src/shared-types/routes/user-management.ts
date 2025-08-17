import { BaseUser } from '../entities';
import { TypedRequestOptions } from '../common';

export type CreateUserRouteConfig = TypedRequestOptions & {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    schoolSubdomain: string;
  };
  params: never;
  query: never;
  files: never;
};

export type CreateUserResponse = { user: BaseUser };