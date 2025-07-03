import { AddSchoolValidation } from "./addSchool.validation";

export type AddSchoolRouteConfig = AddSchoolValidation & { files: never };
export type AddSchoolResponse = void;
