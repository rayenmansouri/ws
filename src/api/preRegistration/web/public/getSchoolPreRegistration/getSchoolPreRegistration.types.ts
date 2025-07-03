import { GetSchoolPreRegistrationValidation } from "./getSchoolPreRegistration.validation";

export type GetSchoolPreRegistrationRouteConfig = GetSchoolPreRegistrationValidation & {
  files: never;
};

export type GetSchoolPreRegistrationResponse = {
  schoolName: string;
  schoolPhoneNumber: string | null;
};
