import { Organization, OrganizationInput } from '../entities';
import { OrganizationSystemType, GradeBookTheme } from '../enums';
import { TypedRequestOptions } from '../common';

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

export type GetConfigRouteType = {
    body: null;
    params: {
        organizationId: string;
    };
    query: never;
    files: never;
};

export type GetConfigResponse = {
    organizationSystemType: OrganizationSystemType;
};