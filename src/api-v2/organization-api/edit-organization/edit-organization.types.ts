import { GradeBookTheme, Organization } from "../../../feature/organization-magement/domain/organization.entity";
import { TypedRequestOptions } from "../../../core/express/types";
import { OrganizationSystemType } from "../../../feature/organization-magement/enums";

export type EditOrganizationRouteConfig = TypedRequestOptions & {
  body: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    subdomain?: string;
    phoneNumber?: string;
    directorName?: string;
    configName?: string;
    maxStudentSeats?: number;
    gradeBookTheme?: GradeBookTheme;
    enableEmail?: boolean;
    organizationSystemType?: OrganizationSystemType;
    logo?: string | null;
    forceCloseSessionDelayInMin?: number;
    openSessionDelayInMin?: number;
    openSessionAdvanceInMin?: number;
    notAvailableTimes?: { day: number; hours: number[] }[];
    cover?: string;
    timeZone?: string | null;
  };
  params: {
    id: string;
  };
  query: never;
  files: never;
};

export type EditOrganizationResponse = { organization: Organization };
