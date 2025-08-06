import { GradeBookTheme, Organization } from "../../feature/organization-magement/domain/organization.entity";
import { TypedRequestOptions } from "../../core/express/types";
import { OrganizationSystemType } from "../../feature/organization-magement/enums";

export type CreateOrganizationRouteConfig = TypedRequestOptions & {
  body: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    subdomain: string;
    phoneNumber: string;
    directorName: string;
    configName: string;
    maxStudentSeats: number;
    gradeBookTheme: GradeBookTheme;
    enableEmail: boolean;
    organizationSystemType: OrganizationSystemType;
  };
  params: never;
  query: never;
  files: never;
};

export type CreateOrganizationResponse = { organization: Organization };