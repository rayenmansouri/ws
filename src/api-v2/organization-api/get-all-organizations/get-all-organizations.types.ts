import { TypedRequestOptions } from "../../../core/express/types";
import { Organization } from "../../../feature/organization-magement/domain/organization.entity";

export type GetAllOrganizationsRouteConfig = TypedRequestOptions & {
  body: never;
  params: never;
  query: {
    page?: number;
    limit?: number;
    search?: string;
  };
  files: never;
};

export type GetAllOrganizationsResponse = { 
  organizations: Organization[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
