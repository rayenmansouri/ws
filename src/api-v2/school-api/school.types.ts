import { GradeBookTheme, School } from "../../feature/organization-magement/domain/organization.entity";
import { TypedRequestOptions } from "../../core/express/types";

export type CreateSchoolRouteConfig = TypedRequestOptions & {
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
  };
  params: never;
  query: never;
  files: never;
};

export type CreateSchoolResponse = { school: School };