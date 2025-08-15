import { TypedRequestOptions } from "../../core/express/types";
import { BaseUser } from "../../feature/user-management/base-user/domain/base-user.entity";
import { UserTypeEnum } from "../../feature/user-management/factory/enums";

export type CreateUserRouteConfig = TypedRequestOptions & {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: UserTypeEnum; 
    schoolSubdomain: string;
    phoneNumber: string;
    participantData?: Record<string, unknown>;
  };
  params: never;
  query: never;
  files: never;
};

export type CreateUserResponse = { user: BaseUser }; 