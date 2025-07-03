import { GetSchoolAvailableTimeConstraintsValidation } from "./getSchoolAvailableTimeConstraints.validation";

export type GetSchoolAvailableTimeConstraintsRouteConfig =
  GetSchoolAvailableTimeConstraintsValidation & { files: never };
export type GetSchoolAvailableTimeConstraintsResponse = { day: number; hours: number[] }[];
