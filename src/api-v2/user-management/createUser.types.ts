import { TypedRequestOptions } from "../../core/express/types";
import { BaseUser } from "../../feature/user-management/base-user/domain/base-user.entity";

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