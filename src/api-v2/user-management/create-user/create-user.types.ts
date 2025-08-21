import { TypedRequestOptions } from "../../../core/express/types";
import { BaseUser } from "../../../feature/user-management/base-user/domain/base-user.entity";
import { CreateBaseUser } from "../../../feature/user-management/base-user/domain/base-user.entity";

export type CreateUserRouteConfig = TypedRequestOptions & {
  body: CreateBaseUser;
  params: never;
  query: never;
  files: never;
};

export type CreateUserResponse = { user: BaseUser }; 