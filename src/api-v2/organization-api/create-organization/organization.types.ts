import { Organization, OrganizationInput } from "../../../feature/organization-magement/domain/organization.entity";
import { TypedRequestOptions } from "../../../core/express/types";

export type CreateOrganizationRouteConfig = TypedRequestOptions & {
  body: Omit<OrganizationInput, "featureFlags" | "website">;
  params: never;
  query: never;
  files: never;
};

export type CreateOrganizationResponse = { organization: Organization };