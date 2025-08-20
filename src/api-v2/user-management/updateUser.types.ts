import { TypedRequestOptions } from "../../core/express/types";
import { BaseUser } from "../../feature/user-management/base-user/domain/base-user.entity";

export type UpdateUserRouteConfig = TypedRequestOptions & {
  body: {
    firstName?: string;
    lastName?: string;
    gender?: 'Male' | 'Female';
    participantData?: Record<string, any>;
  };
  params: {
    id: string;
  };
  query: never;
  files: never;
};

export type UpdateUserResponse = { user: BaseUser };