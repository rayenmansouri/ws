import { ReplaceDatesWithStrings } from "../../../utils";
import { CreateOrganizationResponse } from "../../../../src/api-v2/organization-api/organization.types";
import { CreateOrganizationRouteConfig } from "../../../../src/api-v2/organization-api/organization.types";

export const createOrganizationRoute = {
    path: "/organizations",
    method: "post",
    paramsKey: [],
};

export type CreateOrganizationRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: ReplaceDatesWithStrings<CreateOrganizationRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<CreateOrganizationRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<CreateOrganizationRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<CreateOrganizationRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<CreateOrganizationResponse>;
  };
}
