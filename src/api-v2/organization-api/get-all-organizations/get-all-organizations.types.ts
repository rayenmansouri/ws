import { TypedRequestOptions } from "../../../core/express/types";
import { Organization } from "../../../feature/organization-magement/domain/organization.entity";
import { ResponseWithPagination } from "../../../constants/paginated-response";

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

export type GetAllOrganizationsResponse = ResponseWithPagination<Organization>;
