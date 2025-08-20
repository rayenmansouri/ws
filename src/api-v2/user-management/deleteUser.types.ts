import { TypedRequestOptions } from "../../core/express/types";

export type DeleteUserRouteConfig = TypedRequestOptions & {
  body: never;
  params: {
    id: string;
  };
  query: never;
  files: never;
};

export type DeleteUserResponse = { message: string };