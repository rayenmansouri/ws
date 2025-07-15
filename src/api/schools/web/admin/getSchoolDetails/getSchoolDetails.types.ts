import { SchoolDTO } from "../../../../../feature/schools/dtos/School.dto";
import { GetSchoolDetailsValidation } from "./getSchoolDetails.validation";

export type GetSchoolDetailsRouteConfig = GetSchoolDetailsValidation & { files: never };
export type GetSchoolDetailsResponse = SchoolDTO;
