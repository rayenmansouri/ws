import { TypedRequestOptions } from "../../../core/express/types";
import { BaseUser } from "../../../feature/user-management/base-user/domain/base-user.entity";

export type UpdateUserRouteConfig = TypedRequestOptions & {
  body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    type?: string;
    phoneNumber?: string;
    gender?: string;
    birthDate?: string;
  };
  params: {
    userId: string;
  };
  query: never;
  files: never;
};

export type UpdateUserResponse = { user: BaseUser };