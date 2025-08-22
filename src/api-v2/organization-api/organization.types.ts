import { Organization, OrganizationEntity, OrganizationInput } from "../../feature/organization-magement/domain/organization.entity";
import { TypedRequestOptions } from "../../core/express/types";

export type CreateOrganizationRouteConfig = TypedRequestOptions & {
  body: OrganizationInput;
  params: never;
  query: never;
  files: never;
};

export type CreateOrganizationResponse = { organization: Organization };
