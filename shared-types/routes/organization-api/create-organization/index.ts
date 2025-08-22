import { ReplaceDatesWithStrings } from "../../../utils";
import { CreateOrganizationResponse } from "../../../../src/api-v2/organization-api/create-organization/organization.types";
import { CreateOrganizationRouteConfig } from "../../../../src/api-v2/organization-api/create-organization/organization.types";

export const createOrganizationRoute = {
    path: "/organizations" as const,
    method: "post" as const,
    paramsKey: [],
};

export type CreateOrganizationRouteType = {
  path: "/organizations";
  method: "post";
  paramsKey: readonly string[];
  body?: ReplaceDatesWithStrings<Omit<CreateOrganizationRouteConfig['body'], "featureFlags" | "website">>;
  params?: ReplaceDatesWithStrings<CreateOrganizationRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<CreateOrganizationRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<CreateOrganizationRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<CreateOrganizationResponse>;
  };
}
