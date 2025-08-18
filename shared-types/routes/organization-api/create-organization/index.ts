import { CreateOrganizationResponse } from "../../../../src/api-v2/organization-api/organization.types";
import { CreateOrganizationRouteConfig } from "../../../../src/api-v2/organization-api/organization.types";

export const createOrganizationRoute = {
    path: "/organizations",
    method: "post",
    paramsKey: [],
};

export type CreateOrganizationRouteType = CreateOrganizationRouteConfig & {
  response: CreateOrganizationResponse
}
