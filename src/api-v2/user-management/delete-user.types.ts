import { TypedRequestOptions } from "../../core/express/types";
import { BaseUser } from "../../feature/user-management/base-user/domain/base-user.entity";

export type DeleteUserRouteConfig = TypedRequestOptions & {
  body: never;
  params: {
    userId: string;
  };
  query: never;
  files: never;
};

export type DeleteUserResponse = { user: BaseUser };